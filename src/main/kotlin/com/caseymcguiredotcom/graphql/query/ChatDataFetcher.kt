package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.ChatErrorCode
import com.caseymcguiredotcom.codegen.graphql.types.ChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.FailedChatResponse
import com.caseymcguiredotcom.codegen.graphql.types.SuccessfulChatResponse
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.services.aichat.AiChatService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import org.slf4j.LoggerFactory

@DgsComponent
class ChatDataFetcher(
  private val aiChatService: AiChatService
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
}
