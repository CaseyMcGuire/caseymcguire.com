package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikisTableRow
import java.time.LocalDateTime

class Wiki(
  val id: Int,
  val name: String,
  val createdAt: LocalDateTime
) {

  companion object {
    fun fromRows(
      wikiRow: WikisTableRow,
    ): Wiki {

      return Wiki(
        id = wikiRow.id ?: error("Wiki ID is null"),
        name = wikiRow.name,
        createdAt = wikiRow.createdAt ?: error("Wiki created_at is null")
      )
    }
  }
}
