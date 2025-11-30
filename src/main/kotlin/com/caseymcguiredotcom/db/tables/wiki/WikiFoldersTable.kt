package com.caseymcguiredotcom.db.tables.wiki

import org.jetbrains.exposed.v1.core.Table

object WikiFoldersTable : Table("wiki_folders") {
  val id = integer("id").autoIncrement()
  val name = text("name")
  val displayOrder = text("display_order")

  val wikiId = reference("wiki_id", WikisTable.id)
  val parentFolderId = reference(
    "parent_folder_id",
    id,
  ).nullable()

  override val primaryKey = PrimaryKey(id)

  init {
    // necessary to keep parent_folder.wiki_id and wiki_id in sync
    // in WikiPages table
    uniqueIndex( wikiId, id)
  }
}