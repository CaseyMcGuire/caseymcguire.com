package com.caseymcguiredotcom.db.tables

import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.timestamp

object WorkoutsTable : Table("workout") {
  val id = integer("id").autoIncrement()
  val userId = reference(
    "user_id",
    UsersTable.id,
    onDelete = ReferenceOption.NO_ACTION,
    onUpdate = ReferenceOption.NO_ACTION,
    "fk_user"
  )
  val description = text("description").nullable()
  val createdAt = timestamp("created_at")
  val updatedAt = timestamp("updated_at")

  override val primaryKey = PrimaryKey(id)
}