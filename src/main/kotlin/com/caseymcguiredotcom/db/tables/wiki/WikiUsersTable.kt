package com.caseymcguiredotcom.db.tables.wiki

import com.caseymcguiredotcom.db.tables.UsersTable
import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table

object WikiUsersTable : Table("wiki_users") {
  val id = integer("id").autoIncrement()

  val userId = reference(
    "user_id",
    UsersTable.id,
  )

  val wikiId = reference(
    "wiki_id",
    WikisTable.id,
  )

  override val primaryKey = PrimaryKey(id)

  init {
    uniqueIndex(userId, wikiId)
  }
}