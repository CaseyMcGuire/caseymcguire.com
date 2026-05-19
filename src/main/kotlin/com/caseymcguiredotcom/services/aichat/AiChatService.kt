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
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
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

    val userMessage = aiChatRepository.appendMessage(chat.id, AiChatMessageRole.user, message)
    val assistantMessage = aiChatRepository.appendMessage(chat.id, AiChatMessageRole.assistant, reply)

    return ChatResult(chat.conversationId.toString(), userMessage, assistantMessage)
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

  fun getMessagesForConversation(
    conversationId: UUID,
    cursorMessageId: Long? = null,
    limit: Int = 20,
    descending: Boolean = false,
  ): List<AiChatMessage> {
    findByConversationId(conversationId)
      ?: throw EntityNotFoundException("Conversation not found: $conversationId")
    return if (cursorMessageId == null) {
      aiChatRepository.findMessagesForConversationOrderedById(
        conversationId = conversationId,
        limit = limit,
        descending = descending,
      )
    } else {
      aiChatRepository.findMessagesForConversationAfterCursorOrderedById(
        conversationId = conversationId,
        cursorMessageId = cursorMessageId,
        limit = limit,
        descending = descending,
      )
    }
  }

  fun findByConversationId(
    conversationId: UUID
  ): AiChat? {
    val userId = sessionService.requireAdmin().getId()
    return aiChatRepository.findByConversationId(conversationId)
      .takeIf { it?.userId == userId }
  }

  fun sendMessageStream(
    conversationId: String?,
    message: String,
  ): Flux<ChatStreamEvent> {
    return Mono.fromCallable {
      val userId = sessionService.requireAdmin().getId()
      val chat = if (conversationId != null) {
        findByConversationId(UUID.fromString(conversationId))
          ?: throw EntityNotFoundException("Conversation not found: $conversationId")
      } else {
        aiChatRepository.createChat(userId, UUID.randomUUID(), message.take(MAX_TITLE_LENGTH))
      }
      val userMessage = aiChatRepository.appendMessage(chat.id, AiChatMessageRole.user, message)
      chat to userMessage
    }.flatMapMany { (chat, userMessage) ->
      val history = aiChatRepository.findMessagesByConversationId(chat.conversationId)
        .map { it.toSpringMessage() }

      val accumulator = StringBuilder()

      val started = Mono.just<ChatStreamEvent>(ChatStreamEvent.Started(chat.conversationId))
      val chunks: Flux<ChatStreamEvent> = chatClient.prompt()
        .messages(history)
        .stream()
        .content()
        .doOnNext { accumulator.append(it) }
        .map { ChatStreamEvent.Chunk(chat.conversationId, it) }

      val complete = Mono.fromCallable<ChatStreamEvent> {
        val assistantMessage = aiChatRepository.appendMessage(
          chat.id, AiChatMessageRole.assistant, accumulator.toString(),
        )
        ChatStreamEvent.Complete(chat.conversationId, userMessage, assistantMessage)
      }

      Flux.concat(started, chunks, complete)
    }
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
  val userMessage: AiChatMessage,
  val assistantMessage: AiChatMessage,
)

sealed class ChatStreamEvent {
  abstract val conversationId: UUID
  data class Started(override val conversationId: UUID) : ChatStreamEvent()
  data class Chunk(override val conversationId: UUID, val delta: String) : ChatStreamEvent()
  data class Complete(
    override val conversationId: UUID,
    val userMessage: AiChatMessage,
    val assistantMessage: AiChatMessage,
  ) : ChatStreamEvent()
}

enum class PageDirection {
  ASC,
  DESC
}
