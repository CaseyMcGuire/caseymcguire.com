package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikiFoldersTableRow

class WikiFolder(
  val id: Int,
  val name: String,
  val displayOrder: String,
  val parentFolderId: Int?
) {

  companion object {
    fun fromTableRow(row: WikiFoldersTableRow): WikiFolder {
      return WikiFolder(
        row.id!!,
        row.name,
        row.displayOrder,
        row.parentFolderId
      )
    }
  }

  fun toWikiNode(): WikiNode {
    return WikiNodeFolder(this)
  }


}