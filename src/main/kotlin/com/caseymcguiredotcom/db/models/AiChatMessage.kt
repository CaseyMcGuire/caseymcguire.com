package models

import generated.jooq.enums.AiChatMessageRole
import generated.jooq.tables.pojos.AiChatMessageTableRow
import java.time.OffsetDateTime

data class AiChatMessage(private val row: AiChatMessageTableRow) {
  val id: Long get() = row.id!!
  val chatId: Long get() = row.chatId
  val role: AiChatMessageRole get() = row.role
  val content: String get() = row.content
  val createdAt: OffsetDateTime get() = row.createdAt!!
}