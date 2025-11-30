package com.caseymcguiredotcom.db.tables.workouttracker

import org.jetbrains.exposed.v1.core.Table

object ExercisesTable : Table("exercise") {
  val id = integer("id").autoIncrement()
  val name = text("name")

  override val primaryKey = PrimaryKey(id)
}