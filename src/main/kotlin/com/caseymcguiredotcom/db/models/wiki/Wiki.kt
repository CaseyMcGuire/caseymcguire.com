package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikisTableRow

class Wiki(
  val id: Int,
  val name: String,
) {

  companion object {
    fun fromRows(
      wikiRow: WikisTableRow,
    ): Wiki {
      return Wiki(
        id = wikiRow.id ?: error("Wiki ID is null"),
        name = wikiRow.name,
      )
    }
  }
}
