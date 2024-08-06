package com.caseymcguiredotcom.dao

import com.caseymcguiredotcom.lib.Time
import generated.jooq.tables.references.WORKOUT
import generated.jooq.tables.references.WORKOUT_SET
import models.Workout
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class WorkoutDao(
  val context: DSLContext,
  val time: Time
) {

  fun getWorkouts(userId: Int, offset: Int): List<Workout> {
    return context
      .select()
      .from(WORKOUT)
      .join(WORKOUT_SET)
      .on(WORKOUT.ID.eq(WORKOUT_SET.WORKOUT_ID))
      .where(WORKOUT.USER_ID.eq(userId))
      .fetchArray()
      .map { it.into(Workout::class.java) }
  }

  fun createWorkout(userId: Int, description: String): Int? {
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
    description: String,
    exerciseType: ExerciseType,
    numReps: Int,
    weight: Int
  ): Int? {
    return context.insertInto(
      WORKOUT_SET,
      WORKOUT_SET.WORKOUT_ID,
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
        description,
        exerciseType.name,
        numReps,
        weight,
        UnitOfMass.LB.name,
        time.now(),
        time.now()
      )
      .returningResult(WORKOUT_SET.ID)
      .fetchOne()
      ?.value1()
  }
}

enum class ExerciseType {
  DUMBBELL_BENCH_PRESS
}

enum class UnitOfMass {
  KG,
  LB
}

