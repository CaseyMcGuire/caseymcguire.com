package com.caseymcguiredotcom.dao

import com.caseymcguiredotcom.lib.Time
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import generated.jooq.tables.pojos.WorkoutSet
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
    val workouts = context
      .select()
      .from(WORKOUT)
      .where(WORKOUT.USER_ID.eq(userId))
      .fetchArray()
      .map { it.into(generated.jooq.tables.pojos.Workout::class.java) }

    val workoutIds = workouts.mapNotNull { it.id }

    val sets = context
      .select()
      .from(WORKOUT_SET)
      .where(WORKOUT_SET.WORKOUT_ID.`in`(workoutIds))
      .fetchArray()
      .map { it.into(WorkoutSet::class.java) }

    val workoutIdToSet = sets.groupBy { it.workoutId }
    return workouts.map { Workout(it, workoutIdToSet[it.id!!] ?: emptyList()) }
  }

  fun getWorkout(workoutId: Int): Workout? {

    val workout = context.select()
      .from(WORKOUT)
      .where(WORKOUT.ID.eq(workoutId))
      .fetchOne()
      ?.into(generated.jooq.tables.pojos.Workout::class.java)
      ?: return null

    val sets = context.select()
      .from(WORKOUT_SET)
      .where(WORKOUT_SET.WORKOUT_ID.eq(workoutId))
      .fetchArray()
      .map { it.into(WorkoutSet::class.java) }

    return Workout(workout, sets)
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
    description: String,
    exerciseType: ExerciseType,
    numReps: Int,
    weight: Int
  ): Int {
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
      ?: throw EntityNotFoundException()
  }
}

enum class ExerciseType {
  DUMBBELL_BENCH_PRESS;

  fun toGraphqlType(): com.caseymcguiredotcom.codegen.graphql.types.ExerciseType {
    return com.caseymcguiredotcom.codegen.graphql.types.ExerciseType.valueOf(this.name)
  }
}

enum class UnitOfMass {
  KG,
  LB
}

