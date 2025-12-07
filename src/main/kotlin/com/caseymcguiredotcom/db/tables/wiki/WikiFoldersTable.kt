package com.caseymcguiredotcom.db.tables.wiki

import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.core.and
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.core.isNotNull
import org.jetbrains.exposed.v1.core.isNull
import org.jetbrains.exposed.v1.core.or

object WikiFoldersTable : Table("wiki_folders") {
  val id = integer("id").autoIncrement()
  val name = text("name")
  val displayOrder = text("display_order")

  val wikiId = reference("wiki_id", WikisTable.id)
  val parentFolderId = reference(
    "parent_folder_id",
    id,
  ).nullable()
  val isRoot = bool("is_root").default(false)

  override val primaryKey = PrimaryKey(id)

  init {
    // necessary to keep parent_folder.wiki_id and wiki_id in sync
    // in WikiPages table
    uniqueIndex( wikiId, id)

    // At most one root per wiki
    index(
      "uq_wiki_root_folder",
      isUnique = true,
      wikiId
    ) { isRoot eq true }

    // Root <-> parent null consistency
    // NOTE: checks are not generated in migrations, this is only
    // for clarity
    check("wiki_folders_root_parent_consistency") {
      ((isRoot eq true) and parentFolderId.isNull()) or
          ((isRoot eq false) and parentFolderId.isNotNull())
    }
  }
}