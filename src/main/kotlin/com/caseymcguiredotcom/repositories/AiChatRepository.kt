package com.caseymcguiredotcom.repositories

import generated.jooq.enums.AiChatMessageRole
import generated.jooq.tables.AiChat.Companion.AI_CHAT
import generated.jooq.tables.AiChatMessage.Companion.AI_CHAT_MESSAGE
import generated.jooq.tables.pojos.AiChatMessageTableRow
import generated.jooq.tables.pojos.AiChatTableRow
import models.AiChat
import models.AiChatMessage
import org.jooq.DSLContext
import org.springframework.stereotype.Component
import java.time.OffsetDateTime
import java.util.UUID

@Component
class AiChatRepository(private val dslContext: DSLContext) {

  fun findByConversationId(conversationId: UUID): AiChat? {
    return dslContext
      .selectFrom(AI_CHAT)
      .where(AI_CHAT.CONVERSATION_ID.eq(conversationId))
      .fetchOne()
      ?.into(AiChatTableRow::class.java)
      ?.let { AiChat(it) }
  }

  fun findChatsForUserOrderedByUpdatedAt(
    userId: Int,
    limit: Int = 10,
    descending: Boolean = true,
  ): List<AiChat> {
    return fetchChatsOrderedByUpdatedAt(
      condition = AI_CHAT.USER_ID.eq(userId),
      limit = limit,
      descending = descending,
    )
  }

  fun findChatsForUserAfterCursorOrderedByUpdatedAt(
    userId: Int,
    cursorUpdatedAt: OffsetDateTime,
    cursorConversationId: UUID,
    limit: Int = 10,
    descending: Boolean = true,
  ): List<AiChat> {
    val userCondition = AI_CHAT.USER_ID.eq(userId)
    // Match the full ordering so rows with identical updatedAt values are not skipped or duplicated.
    val cursorCondition = if (descending) {
      userCondition.and(
        AI_CHAT.UPDATED_AT.lt(cursorUpdatedAt)
          .or(
            AI_CHAT.UPDATED_AT.eq(cursorUpdatedAt)
              .and(AI_CHAT.CONVERSATION_ID.lt(cursorConversationId))
          )
      )
    } else {
      userCondition.and(
        AI_CHAT.UPDATED_AT.gt(cursorUpdatedAt)
          .or(
            AI_CHAT.UPDATED_AT.eq(cursorUpdatedAt)
              .and(AI_CHAT.CONVERSATION_ID.gt(cursorConversationId))
          )
      )
    }
    return fetchChatsOrderedByUpdatedAt(
      condition = cursorCondition,
      limit = limit,
      descending = descending,
    )
  }

  private fun fetchChatsOrderedByUpdatedAt(
    condition: org.jooq.Condition,
    limit: Int,
    descending: Boolean,
  ): List<AiChat> {
    val orderBy = if (descending) {
      listOf(AI_CHAT.UPDATED_AT.desc(), AI_CHAT.CONVERSATION_ID.desc())
    } else {
      listOf(AI_CHAT.UPDATED_AT.asc(), AI_CHAT.CONVERSATION_ID.asc())
    }
    return dslContext
      .selectFrom(AI_CHAT)
      .where(condition)
      .orderBy(orderBy)
      .limit(limit)
      .fetch()
      .into(AiChatTableRow::class.java)
      .map { AiChat(it) }
  }

  fun createChat(userId: Int, conversationId: UUID, title: String): AiChat {
    val id = dslContext
      .insertInto(AI_CHAT, AI_CHAT.CONVERSATION_ID, AI_CHAT.TITLE, AI_CHAT.USER_ID)
      .values(conversationId, title, userId)
      .returningResult(AI_CHAT.ID)
      .fetchOne()
      ?.component1()
      ?: error("Failed to insert ai_chat row")
    return findById(id) ?: error("Inserted ai_chat row $id not found on read-back")
  }

  fun findMessagesByConversationId(conversationId: UUID): List<AiChatMessage> {
    return dslContext
      .select(AI_CHAT_MESSAGE.asterisk())
      .from(AI_CHAT_MESSAGE)
      .join(AI_CHAT).on(AI_CHAT_MESSAGE.CHAT_ID.eq(AI_CHAT.ID))
      .where(AI_CHAT.CONVERSATION_ID.eq(conversationId))
      .orderBy(AI_CHAT_MESSAGE.ID.asc())
      .fetch()
      .into(AiChatMessageTableRow::class.java)
      .map { AiChatMessage(it) }
  }

  fun appendMessage(chatId: Long, role: AiChatMessageRole, content: String) {
    dslContext
      .insertInto(AI_CHAT_MESSAGE, AI_CHAT_MESSAGE.CHAT_ID, AI_CHAT_MESSAGE.ROLE, AI_CHAT_MESSAGE.CONTENT)
      .values(chatId, role, content)
      .execute()
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

  private fun findById(id: Long): AiChat? {
    return dslContext
      .selectFrom(AI_CHAT)
      .where(AI_CHAT.ID.eq(id))
      .fetchOne()
      ?.into(AiChatTableRow::class.java)
      ?.let { AiChat(it) }
  }
}
