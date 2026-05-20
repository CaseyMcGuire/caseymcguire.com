package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.AiConversation
import com.caseymcguiredotcom.codegen.graphql.types.AiConversationConnection
import com.caseymcguiredotcom.codegen.graphql.types.AiConversationEdge
import com.caseymcguiredotcom.codegen.graphql.types.AiMessage
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageChunkEvent
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageCompleteEvent
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageErrorEvent
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageConnection
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageEdge
import com.caseymcguiredotcom.codegen.graphql.types.ChatErrorCode
import com.caseymcguiredotcom.codegen.graphql.types.ChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.PageInfo
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulChatResponse
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import com.caseymcguiredotcom.services.CursorService
import com.caseymcguiredotcom.services.aichat.AiChatService
import com.caseymcguiredotcom.services.aichat.PageDirection
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsData
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageRole
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageStartedEvent
import com.caseymcguiredotcom.codegen.graphql.types.AiMessageStreamEvent
import com.caseymcguiredotcom.services.aichat.ChatStreamEvent
import com.netflix.graphql.dgs.DgsSubscription
import com.netflix.graphql.dgs.InputArgument
import generated.jooq.enums.AiChatMessageRole
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.reactor.asFlux
import models.AiChatMessage
import org.slf4j.LoggerFactory
import reactor.core.publisher.Flux
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
        userMessageEdge = result.userMessage.toAiMessageEdge(),
        assistantMessageEdge = result.assistantMessage.toAiMessageEdge(),
      )
    } catch (e: Exception) {
      log.error("Failed to send message", e)
      when (e) {
        is UserNotLoggedInException -> FailedChatResponse(
          errorCode = ChatErrorCode.NOT_LOGGED_IN,
          userFacingErrorMessage = "You're not logged in. Please log in and try again.",
        )
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
  fun getAiChatConversations(
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

  @DgsQuery(field = DgsConstants.QUERY.AiConversation)
  fun getAiConversation(@InputArgument id: String): AiConversation? {
    val chat = aiChatService.findByConversationId(UUID.fromString(id)) ?: return null
    return AiConversation(id = chat.conversationId.toString(), title = chat.title)
  }

  @DgsData(parentType = DgsConstants.AICONVERSATION.TYPE_NAME, field = DgsConstants.AICONVERSATION.Messages)
  fun getAiConversationMessages(
    dfe: DgsDataFetchingEnvironment,
    @InputArgument first: Int?,
    @InputArgument after: String?,
    @InputArgument last: Int?,
    @InputArgument before: String?,
  ): AiMessageConnection {
    require(!(first != null && last != null)) { "Cannot specify both `first` and `last`" }
    require(!(first != null && before != null)) { "`before` requires `last`, not `first`" }
    require(!(last != null && after != null)) { "`after` requires `first`, not `last`" }

    val (backward, pageSize) = when {
      first != null -> Pair(false, first)
      last != null -> Pair(true, last)
      else -> Pair(false, DEFAULT_PAGE_SIZE)
    }
    require(pageSize in 1..MAX_PAGE_SIZE) { "Page size must be between 1 and $MAX_PAGE_SIZE" }

    val cursorMessageId = (after ?: before)?.let {
      cursorService.decode(it, AiMessageCursor::class.java).messageId
    }

    val conversation = dfe.getSource<AiConversation>() ?: error("Missing parent AiConversation")
    val fetched = aiChatService.getMessagesForConversation(
      conversationId = UUID.fromString(conversation.id),
      cursorMessageId = cursorMessageId,
      limit = pageSize + 1,
      descending = backward,
    )

    val hasMore = fetched.size > pageSize
    val page = fetched.take(pageSize)
    // Repo orders DESC when backward; flip back to canonical ASC for the wire format.
    val canonical = if (backward) page.reversed() else page

    val edges = canonical.map { message ->
      val node = message.toGqlAiMessage()
      AiMessageEdge(
        node = node,
        cursor = cursorService.encode(AiMessageCursor(messageId = message.id)),
      )
    }
    return AiMessageConnection(
      pageInfo = PageInfo(
        hasNextPage = !backward && hasMore,
        hasPreviousPage = backward && hasMore,
        startCursor = edges.firstOrNull()?.cursor,
        endCursor = edges.lastOrNull()?.cursor,
      ),
      edges = edges,
    )
  }

  @DgsSubscription(field = DgsConstants.SUBSCRIPTION.SendMessage)
  fun sendMessageStream(
    conversationId: String?,
    message: String,
  ): Flux<AiMessageStreamEvent> {
    return aiChatService.sendMessageStream(conversationId, message)
      .map { event -> event.toGqlEvent() }
      .catch { e ->
        log.error("Failed to stream message", e)
        val event: AiMessageStreamEvent = when (e) {
          is UserNotLoggedInException -> AiMessageErrorEvent(
            errorCode = ChatErrorCode.NOT_LOGGED_IN,
            userFacingErrorMessage = "You're not logged in. Please log in and try again.",
          )
          is EntityNotFoundException -> AiMessageErrorEvent(
            errorCode = ChatErrorCode.CONVERSATION_NOT_FOUND,
            userFacingErrorMessage = e.message ?: "Conversation not found.",
          )
          else -> AiMessageErrorEvent(
            errorCode = ChatErrorCode.UNKNOWN,
            userFacingErrorMessage = "Something went wrong. Please try again.",
          )
        }
        emit(event)
      }
      .asFlux()
  }

  private fun ChatStreamEvent.toGqlEvent(): AiMessageStreamEvent = when (this) {
    is ChatStreamEvent.Started -> AiMessageStartedEvent(
      conversationId = conversationId.toString(),
    )
    is ChatStreamEvent.Chunk -> AiMessageChunkEvent(
      delta = delta,
    )
    is ChatStreamEvent.Complete -> AiMessageCompleteEvent(
      conversationId = conversationId.toString(),
      userMessageEdge = userMessage.toAiMessageEdge(),
      assistantMessageEdge = assistantMessage.toAiMessageEdge(),
    )
  }

  private fun AiChatMessage.toGqlAiMessage(): AiMessage = AiMessage(
    id = id.toString(),
    role = role.toGqlRole(),
    content = content,
    createdAt = createdAt.toString(),
  )

  private fun AiChatMessage.toAiMessageEdge(): AiMessageEdge = AiMessageEdge(
    node = toGqlAiMessage(),
    cursor = cursorService.encode(AiMessageCursor(messageId = id)),
  )

  private fun AiChatMessageRole.toGqlRole(): AiMessageRole = when (this) {
    AiChatMessageRole.user -> AiMessageRole.USER
    AiChatMessageRole.assistant -> AiMessageRole.ASSISTANT
    AiChatMessageRole.system -> AiMessageRole.SYSTEM
    AiChatMessageRole.tool -> AiMessageRole.TOOL
  }

  data class AiConversationCursor(
    val conversationId: UUID,
  )

  data class AiMessageCursor(
    val messageId: Long,
  )
}
