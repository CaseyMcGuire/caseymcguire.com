package com.caseymcguiredotcom.repositories

import generated.jooq.enums.AiChatMessageRole
import generated.jooq.tables.AiChat.Companion.AI_CHAT
import generated.jooq.tables.AiChatMessage.Companion.AI_CHAT_MESSAGE
import org.jooq.DSLContext
import org.springframework.ai.chat.messages.AssistantMessage
import org.springframework.ai.chat.messages.Message
import org.springframework.ai.chat.messages.SystemMessage
import org.springframework.ai.chat.messages.UserMessage
import org.springframework.stereotype.Component
import java.time.OffsetDateTime
import java.util.UUID

@Component
class AiChatRepository(private val dslContext: DSLContext) {

  fun findChatIdByConversationId(conversationId: UUID): Long? {
    return dslContext
      .select(AI_CHAT.ID)
      .from(AI_CHAT)
      .where(AI_CHAT.CONVERSATION_ID.eq(conversationId))
      .fetchOne(AI_CHAT.ID)
  }

  fun createChat(userId: Int, conversationId: UUID, title: String): Long {
    return dslContext
      .insertInto(AI_CHAT, AI_CHAT.CONVERSATION_ID, AI_CHAT.TITLE, AI_CHAT.USER_ID)
      .values(conversationId, title, userId)
      .returningResult(AI_CHAT.ID)
      .fetchOne()
      ?.component1()
      ?: error("Failed to insert ai_chat row")
  }

  fun findMessagesByConversationId(conversationId: UUID): List<Message> {
    return dslContext
      .select(AI_CHAT_MESSAGE.ROLE, AI_CHAT_MESSAGE.CONTENT)
      .from(AI_CHAT_MESSAGE)
      .join(AI_CHAT).on(AI_CHAT_MESSAGE.CHAT_ID.eq(AI_CHAT.ID))
      .where(AI_CHAT.CONVERSATION_ID.eq(conversationId))
      .orderBy(AI_CHAT_MESSAGE.ID.asc())
      .fetch()
      .map { record -> toSpringMessage(record.value1()!!, record.value2()!!) }
  }

  fun appendMessage(chatId: Long, role: AiChatMessageRole, content: String) {
    dslContext
      .insertInto(AI_CHAT_MESSAGE, AI_CHAT_MESSAGE.CHAT_ID, AI_CHAT_MESSAGE.ROLE, AI_CHAT_MESSAGE.CONTENT)
      .values(chatId, role, content)
      .execute()
  }

  fun touchUpdatedAt(chatId: Long) {
    dslContext
      .update(AI_CHAT)
      .set(AI_CHAT.UPDATED_AT, OffsetDateTime.now())
      .where(AI_CHAT.ID.eq(chatId))
      .execute()
  }

  fun deleteByConversationId(conversationId: UUID) {
    dslContext
      .deleteFrom(AI_CHAT)
      .where(AI_CHAT.CONVERSATION_ID.eq(conversationId))
      .execute()
  }

  private fun toSpringMessage(role: AiChatMessageRole, content: String): Message = when (role) {
    AiChatMessageRole.user -> UserMessage(content)
    AiChatMessageRole.assistant -> AssistantMessage(content)
    AiChatMessageRole.system -> SystemMessage(content)
    AiChatMessageRole.tool -> error("Cannot reconstruct tool messages from text alone")
  }
}