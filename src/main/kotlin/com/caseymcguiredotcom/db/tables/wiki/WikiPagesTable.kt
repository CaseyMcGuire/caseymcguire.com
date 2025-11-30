package com.caseymcguiredotcom.db.tables.wiki

import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.datetime

object WikiPagesTable : Table("wiki_pages") {
  val id = integer("id").autoIncrement()
  val wikiId = reference(
    "wiki_id",
    WikisTable.id,
  )
  val parentFolderId = reference(
    "parent_folder_fk_id",
    WikiFoldersTable.id,
  ).nullable()

  val name = text("name")
  val content = text("content")
  val displayOrder = text("display_order")

  val createdAt = datetime("created_at")
  val updatedAt = datetime("updated_at")

  override val primaryKey = PrimaryKey(id)

  init {
    foreignKey(
      wikiId to WikiFoldersTable.wikiId,
      parentFolderId to WikiFoldersTable.id,
    )
  }
}