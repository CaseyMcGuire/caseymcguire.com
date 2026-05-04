package com.caseymcguiredotcom.services.aichat

import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.repositories.AiChatRepository
import com.caseymcguiredotcom.services.SessionService
import generated.jooq.enums.AiChatMessageRole
import org.springframework.ai.chat.client.ChatClient
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

private const val MAX_TITLE_LENGTH = 80

@Service
class AiChatService(
  private val chatClient: ChatClient,
  private val aiChatRepository: AiChatRepository,
  private val sessionService: SessionService,
) {

  @Transactional
  fun sendMessage(conversationId: String?, message: String): ChatResult {
    val userId = sessionService.requireAdmin().getId()

    val (chatId, conversationUuid, history) = if (conversationId != null) {
      val uuid = UUID.fromString(conversationId)
      val existingChatId = aiChatRepository.findChatIdByConversationId(uuid)
        ?: throw EntityNotFoundException("Conversation not found: $conversationId")
      Triple(existingChatId, uuid, aiChatRepository.findMessagesByConversationId(uuid))
    } else {
      val newUuid = UUID.randomUUID()
      val newChatId = aiChatRepository.createChat(userId, newUuid, message.take(MAX_TITLE_LENGTH))
      Triple(newChatId, newUuid, emptyList())
    }

    val reply = chatClient.prompt()
      .messages(history)
      .user(message)
      .call()
      .content() ?: error("AI returned no content")

    aiChatRepository.appendMessage(chatId, AiChatMessageRole.user, message)
    aiChatRepository.appendMessage(chatId, AiChatMessageRole.assistant, reply)
    aiChatRepository.touchUpdatedAt(chatId)

    return ChatResult(conversationUuid.toString(), reply)
  }
}

data class ChatResult(
  val conversationId: String,
  val reply: String,
)