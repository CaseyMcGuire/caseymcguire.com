package com.caseymcguiredotcom.repositories.wiki

import generated.jooq.tables.pojos.WikiFoldersTableRow
import generated.jooq.tables.pojos.WikiPagesTableRow

sealed interface WikiTableRowNode {
  val id: Int
  val displayOrder: String
}

data class WikiFolderTableRowNode(
  val folder: WikiFoldersTableRow
) : WikiTableRowNode {
  override val id = folder.id!!
  override val displayOrder = folder.displayOrder
}

data class WikiPageTableRowNode(
  val page: WikiPagesTableRow
) : WikiTableRowNode {
  override val id = page.id!!
  override val displayOrder = page.displayOrder
}

fun WikiFoldersTableRow.toWikiNode(): WikiTableRowNode =
  WikiFolderTableRowNode(this)

fun WikiPagesTableRow.toWikiNode(): WikiPageTableRowNode =
  WikiPageTableRowNode(this)