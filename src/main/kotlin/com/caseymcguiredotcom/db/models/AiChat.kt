package models

import generated.jooq.tables.pojos.AiChatTableRow
import java.time.OffsetDateTime
import java.util.UUID

data class AiChat(private val row: AiChatTableRow) {
  val id: Long get() = row.id!!
  val conversationId: UUID get() = row.conversationId
  val title: String get() = row.title
  val userId: Int get() = row.userId
  val createdAt: OffsetDateTime get() = row.createdAt!!
  val updatedAt: OffsetDateTime get() = row.updatedAt!!
}