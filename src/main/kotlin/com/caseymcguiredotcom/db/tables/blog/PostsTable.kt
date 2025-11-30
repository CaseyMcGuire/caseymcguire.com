package com.caseymcguiredotcom.db.tables.blog

import com.caseymcguiredotcom.db.tables.UsersTable
import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.CurrentDate
import org.jetbrains.exposed.v1.javatime.date

object PostsTable : Table("posts") {
  val id = integer("id").autoIncrement()
  val userId = integer("user_id").references(
    ref = UsersTable.id,
    onDelete = ReferenceOption.NO_ACTION,
    onUpdate = ReferenceOption.NO_ACTION,
    fkName = "posts_user_id_fkey"
  )
  val title = text("title").nullable()
  val contents = text("contents").nullable()
  val publishedDate = date("published_date").defaultExpression(CurrentDate)

  override val primaryKey = PrimaryKey(id)
}