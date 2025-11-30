package com.caseymcguiredotcom.db.tables.wiki

import org.jetbrains.exposed.v1.core.Table

object WikisTable : Table("wikis") {
  val id = integer("id").autoIncrement()
  val name = text("name").uniqueIndex()

  override val primaryKey = PrimaryKey(id)
}