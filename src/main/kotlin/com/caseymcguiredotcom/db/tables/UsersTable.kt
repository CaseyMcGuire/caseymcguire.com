package com.caseymcguiredotcom.db.tables

import org.jetbrains.exposed.v1.core.Table

object UsersTable : Table("users") {
  val id = integer("id").autoIncrement()
  val role = varchar("role", 45).nullable()
  val password = varchar("password", 60)
  val email = text("email").uniqueIndex("users_email_key")

  override val primaryKey = PrimaryKey(id)
}