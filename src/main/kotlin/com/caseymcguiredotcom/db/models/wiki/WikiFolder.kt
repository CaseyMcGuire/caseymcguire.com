package com.caseymcguiredotcom.db.models.wiki

import generated.jooq.tables.pojos.WikiFoldersTableRow

class WikiFolder(
  val id: Int,
  val name: String,
  val displayOrder: String,
  val parentFolderId: Int?,
  val wikiId: Int,
  val isRoot: Boolean
) {

  companion object {
    fun fromTableRow(row: WikiFoldersTableRow): WikiFolder {
      return WikiFolder(
        id = row.id!!,
        name = row.name,
        displayOrder = row.displayOrder,
        parentFolderId = row.parentFolderId,
        wikiId = row.wikiId,
        isRoot = row.isRoot == true
      )
    }
  }

  fun toWikiNode(): WikiNode {
    return WikiNodeFolder(this)
  }


}