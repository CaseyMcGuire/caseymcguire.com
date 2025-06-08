package com.caseymcguiredotcom.db.tables

import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.timestamp


object WorkoutSetsTable : Table("workout_set") {
  val id = integer("id").autoIncrement()
  val workoutId = reference("workout_id",
    WorkoutsTable.id,
    onDelete = ReferenceOption.NO_ACTION,
    onUpdate = ReferenceOption.NO_ACTION,
    "fk_workout"
  )
  val description = text("description").nullable()
  val exerciseType = text("exercise_type")
  val numReps = integer("num_reps")
  val weight = integer("weight")
  val unitOfMass = varchar("unit_of_mass", 50)
  val createdAt = timestamp("created_at")
  val updatedAt = timestamp("updated_at")
  val exerciseId = reference("exercise_id",
    ExercisesTable.id,
    onDelete = ReferenceOption.NO_ACTION,
    onUpdate = ReferenceOption.NO_ACTION,
    "fk_exercise"
  ).nullable()

  override val primaryKey = PrimaryKey(id)
}