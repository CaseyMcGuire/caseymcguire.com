package com.caseymcguiredotcom.services.aichat

import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.repositories.AiChatRepository
import com.caseymcguiredotcom.services.SessionService
import generated.jooq.enums.AiChatMessageRole
import models.AiChat
import models.AiChatMessage
import org.springframework.ai.chat.client.ChatClient
import org.springframework.ai.chat.messages.AssistantMessage
import org.springframework.ai.chat.messages.Message
import org.springframework.ai.chat.messages.SystemMessage
import org.springframework.ai.chat.messages.UserMessage
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

    val chat = if (conversationId != null) {
      findByConversationId(UUID.fromString(conversationId))
        ?: throw EntityNotFoundException("Conversation not found: $conversationId")
    } else {
      aiChatRepository.createChat(userId, UUID.randomUUID(), message.take(MAX_TITLE_LENGTH))
    }

    val history = aiChatRepository.findMessagesByConversationId(chat.conversationId)
      .map { it.toSpringMessage() }

    val reply = chatClient.prompt()
      .messages(history)
      .user(message)
      .call()
      .content() ?: error("AI returned no content")

    aiChatRepository.appendMessage(chat.id, AiChatMessageRole.user, message)
    aiChatRepository.appendMessage(chat.id, AiChatMessageRole.assistant, reply)

    return ChatResult(chat.conversationId.toString(), reply)
  }

  fun getConversationsForCurrentUser(
    conversationId: UUID? = null,
    limit: Int = 10,
    pageDirection: PageDirection = PageDirection.DESC,
  ): List<AiChat> {
    val userId = sessionService.requireAdmin().getId()
    val descending = pageDirection == PageDirection.DESC
    if (conversationId == null) {
      return aiChatRepository.findChatsForUserOrderedByUpdatedAt(
        userId = userId,
        limit = limit,
        descending = descending,
      )
    }
    val cursor = findByConversationId(conversationId)
      ?: throw EntityNotFoundException("Conversation not found: $conversationId")
    return aiChatRepository.findChatsForUserAfterCursorOrderedByUpdatedAt(
      userId = userId,
      cursorUpdatedAt = cursor.updatedAt,
      cursorConversationId = cursor.conversationId,
      limit = limit,
      descending = descending,
    )
  }

  private fun findByConversationId(
    conversationId: UUID
  ): AiChat? {
    val userId = sessionService.requireAdmin().getId()
    return aiChatRepository.findByConversationId(conversationId)
      .takeIf { it?.userId == userId }
  }

  private fun AiChatMessage.toSpringMessage(): Message = when (role) {
    AiChatMessageRole.user -> UserMessage(content)
    AiChatMessageRole.assistant -> AssistantMessage(content)
    AiChatMessageRole.system -> SystemMessage(content)
    AiChatMessageRole.tool -> error("Cannot reconstruct tool messages from text alone")
  }
}

data class ChatResult(
  val conversationId: String,
  val reply: String,
)

enum class PageDirection {
  ASC,
  DESC
}
