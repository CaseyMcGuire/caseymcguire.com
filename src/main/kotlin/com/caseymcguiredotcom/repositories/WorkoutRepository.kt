package com.caseymcguiredotcom.repositories

import com.caseymcguiredotcom.lib.Time
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import generated.jooq.tables.pojos.ExerciseTableRow
import generated.jooq.tables.pojos.WorkoutSetTableRow
import generated.jooq.tables.pojos.WorkoutTableRow
import generated.jooq.tables.references.EXERCISE
import generated.jooq.tables.references.WORKOUT
import generated.jooq.tables.references.WORKOUT_SET
import models.Exercise
import models.Workout
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class WorkoutDao(
  val context: DSLContext,
  val time: Time
) {

  fun getWorkouts(userId: Int, offset: Int): List<Workout> {
    val workouts = context
      .select()
      .from(WORKOUT)
      .where(WORKOUT.USER_ID.eq(userId))
      .fetchArray()
      .map { it.into(WorkoutTableRow::class.java) }

    val workoutIds = workouts.mapNotNull { it.id }

    val sets = context
      .select()
      .from(WORKOUT_SET)
      .where(WORKOUT_SET.WORKOUT_ID.`in`(workoutIds))
      .fetchArray()
      .map { it.into(WorkoutSetTableRow::class.java) }

    val workoutIdToSet = sets.groupBy { it.workoutId }
    return workouts.map { Workout(it, workoutIdToSet[it.id!!] ?: emptyList(), getExercisesForSets(sets)) }
  }

  fun getWorkout(workoutId: Int): Workout? {

    val workout = context.select()
      .from(WORKOUT)
      .where(WORKOUT.ID.eq(workoutId))
      .fetchOne()
      ?.into(WorkoutTableRow::class.java)
      ?: return null

    val sets = context.select()
      .from(WORKOUT_SET)
      .where(WORKOUT_SET.WORKOUT_ID.eq(workoutId))
      .fetchArray()
      .map { it.into(WorkoutSetTableRow::class.java) }

    return Workout(workout, sets, getExercisesForSets(sets))
  }

  private fun getExercisesForSets(sets: List<WorkoutSetTableRow>): List<ExerciseTableRow> {
    val exerciseIds = sets.mapNotNull { it.exerciseId }

    return context
      .select()
      .from(EXERCISE)
      .where(EXERCISE.ID.`in`(exerciseIds))
      .fetchArray()
      .map { it.into(ExerciseTableRow::class.java) }
  }

  fun createWorkout(userId: Int, description: String?): Int? {
    return context
      .insertInto(
        WORKOUT,
        WORKOUT.USER_ID,
        WORKOUT.DESCRIPTION,
        WORKOUT.CREATED_AT,
        WORKOUT.UPDATED_AT
      )
      .values(
        userId,
        description,
        time.now(),
        time.now()
      )
      .returningResult(WORKOUT.ID)
      .fetchOne()
      ?.value1()
  }

  fun insertWorkoutSet(
    workoutId: Int,
    exerciseId: Int,
    description: String,
    numReps: Int,
    weight: Int
  ): Int {
    return context.insertInto(
      WORKOUT_SET,
      WORKOUT_SET.WORKOUT_ID,
      WORKOUT_SET.EXERCISE_ID,
      WORKOUT_SET.DESCRIPTION,
      WORKOUT_SET.EXERCISE_TYPE,
      WORKOUT_SET.NUM_REPS,
      WORKOUT_SET.WEIGHT,
      WORKOUT_SET.UNIT_OF_MASS,
      WORKOUT_SET.CREATED_AT,
      WORKOUT_SET.UPDATED_AT
    )
      .values(
        workoutId,
        exerciseId,
        description,
        ExerciseType.NULL.name,
        numReps,
        weight,
        UnitOfMass.LB.name,
        time.now(),
        time.now()
      )
      .returningResult(WORKOUT_SET.ID)
      .fetchOne()
      ?.value1()
      ?: throw EntityNotFoundException()
  }

  fun createExercise(name: String): Int? {
    return context.insertInto(
      EXERCISE,
      EXERCISE.NAME
    )
      .values(
        name
      )
      .returningResult(EXERCISE.ID)
      .fetchOne()
      ?.value1()
  }

  fun getExerciseById(id: Int): Exercise? {
    return context.select()
      .from(EXERCISE)
      .where(EXERCISE.ID.eq(id))
      .fetchOneInto(Exercise::class.java)
  }

  fun getExerciseByName(name: String): Exercise? {
    return context.select()
      .from(EXERCISE)
      .where(EXERCISE.NAME.eq(name))
      .fetchOneInto(Exercise::class.java)
  }

  fun getAllExercises(): List<Exercise> {
    return context.select()
      .from(EXERCISE)
      .fetchInto(Exercise::class.java)
  }
}

enum class ExerciseType {
  DUMBBELL_BENCH_PRESS,
  NULL;
}

enum class UnitOfMass {
  KG,
  LB
}

