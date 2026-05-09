package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.AiConversation
import com.caseymcguiredotcom.codegen.graphql.types.AiConversationConnection
import com.caseymcguiredotcom.codegen.graphql.types.AiConversationEdge
import com.caseymcguiredotcom.codegen.graphql.types.ChatErrorCode
import com.caseymcguiredotcom.codegen.graphql.types.ChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.PageInfo
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulChatResponse
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.services.CursorService
import com.caseymcguiredotcom.services.aichat.AiChatService
import com.caseymcguiredotcom.services.aichat.PageDirection
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import org.slf4j.LoggerFactory
import java.util.UUID

private const val MAX_PAGE_SIZE = 100
private const val DEFAULT_PAGE_SIZE = 10

@DgsComponent
class ChatDataFetcher(
  private val aiChatService: AiChatService,
  private val cursorService: CursorService,
) {

  private val log = LoggerFactory.getLogger(ChatDataFetcher::class.java)

  @DgsMutation(field = DgsConstants.MUTATION.SendMessage)
  fun sendMessage(conversationId: String?, message: String): ChatResponse {
    return try {
      val result = aiChatService.sendMessage(conversationId, message)
      SuccessfulChatResponse(
        conversationId = result.conversationId,
        reply = result.reply,
      )
    } catch (e: Exception) {
      log.error("Failed to send message", e)
      when (e) {
        is EntityNotFoundException -> FailedChatResponse(
          errorCode = ChatErrorCode.CONVERSATION_NOT_FOUND,
          userFacingErrorMessage = e.message ?: "Conversation not found.",
        )
        else -> {
          FailedChatResponse(
            errorCode = ChatErrorCode.UNKNOWN,
            userFacingErrorMessage = "Something went wrong. Please try again.",
          )
        }
      }
    }
  }

  @DgsQuery(field = DgsConstants.QUERY.AiConversations)
  fun getAiChatConversation(
    first: Int?,
    after: String?,
    last: Int?,
    before: String?,
  ): AiConversationConnection {
    require(!(first != null && last != null)) { "Cannot specify both `first` and `last`" }
    require(!(first != null && before != null)) { "`before` requires `last`, not `first`" }
    require(!(last != null && after != null)) { "`after` requires `first`, not `last`" }

    val (descending, pageSize) =
      when {
        first != null -> Pair(true, first)
        last != null -> Pair(false, last)
        else -> Pair(true, DEFAULT_PAGE_SIZE)
      }
    require(pageSize in 1..MAX_PAGE_SIZE) { "Page size must be between 1 and $MAX_PAGE_SIZE" }

    val cursorUuid = (after ?: before)?.let {
      cursorService.decode(it, AiConversationCursor::class.java)
    }

    val fetched = aiChatService.getConversationsForCurrentUser(
      conversationId = cursorUuid?.conversationId,
      limit = pageSize + 1,
      pageDirection = if (descending) PageDirection.DESC else PageDirection.ASC,
    )

    val hasMore = fetched.size > pageSize
    val page = fetched.take(pageSize)
    val canonical = if (descending) page else page.reversed()

    val edges = canonical.map { chat ->
      val cursor = cursorService.encode(
        AiConversationCursor(conversationId = chat.conversationId)
      )
      AiConversationEdge(
        node = AiConversation(id = chat.conversationId.toString(), title = chat.title),
        cursor = cursor,
      )
    }

    return AiConversationConnection(
      pageInfo = PageInfo(
        hasNextPage = descending && hasMore,
        hasPreviousPage = !descending && hasMore,
        startCursor = edges.firstOrNull()?.cursor,
        endCursor = edges.lastOrNull()?.cursor,
      ),
      edges = edges,
    )
  }

  data class AiConversationCursor(
    val conversationId: UUID,
  )
}
