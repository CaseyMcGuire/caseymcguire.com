package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikiPagesTableRow

data class WikiPage(
  val id: Int,
  val name: String,
  val content: String,
  val displayOrder: String,
) {
  companion object {
    fun fromTableRow(
      row: WikiPagesTableRow
    ): WikiPage {
      return WikiPage(
        id = row.id ?: error("Wiki page ID is null"),
        name = row.name,
        content = row.content,
        displayOrder = row.displayOrder,
      )
    }

  }

  fun toWikiNode(): WikiNode {
    return WikiNodePage(this)
  }
}