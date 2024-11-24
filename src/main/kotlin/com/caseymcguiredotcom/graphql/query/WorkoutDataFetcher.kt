package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.*
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.services.WorkoutService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsData
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery

@DgsComponent
class WorkoutDataFetcher(
  private val workoutService: WorkoutService
) {

  companion object {
    val DEFAULT_FAILED_WORKOUT_RESPONSE = FailedWorkoutMutationResponse(
      success = false,
      userFacingErrorMessage = "Something went wrong. Please try again"
    )

    val DEFAULT_FAILED_EXERCISE_RESPONSE = FailedExerciseMutationResponse(
      success = false,
      userFacingErrorMessage = "Something went wrong. Please try again."
    )
  }

  @DgsQuery
  fun workoutTracker(): WorkoutTracker {
    return WorkoutTracker()
  }

  @DgsData(parentType = DgsConstants.WORKOUTTRACKER.TYPE_NAME, field = "workouts")
  fun getWorkouts(): List<Workout> {
    return workoutService.getWorkouts().map { workout ->
      Workout(
        id = workout.id.toString(),
        description = workout.description,
        sets = workout.sets.map {
          WorkoutSet(
            id = it.id.toString(),
            exerciseType = it.exerciseType.toGraphqlType(),
            numReps = it.numReps,
            weight = it.weight
          )
        }
      )
    }
  }

  @DgsData(parentType = DgsConstants.WORKOUTTRACKER.TYPE_NAME, field = "exerciseByName")
  fun getExerciseByName(name: String): Exercise? {
    return workoutService.getExerciseByName(name)?.let {
      Exercise(
        id = it.id.toString(),
        name = it.name
      )
    }
  }

  @DgsMutation
  fun createWorkout(description: String?): WorkoutMutationResponse {
    try {
      val workout = workoutService.createWorkout(description)
        ?: return DEFAULT_FAILED_WORKOUT_RESPONSE

      return SuccessfulWorkoutMutationResponse(
        success = true,
        workout = Workout(
          id = workout.id.toString(),
          description = workout.description,
          sets = emptyList()
        )
      )
    } catch (e: Exception) {
      return DEFAULT_FAILED_WORKOUT_RESPONSE
    }
  }

  @DgsMutation
  fun addWorkoutSet(
    workoutId: String,
    description: String,
    exerciseType: ExerciseType,
    numReps: Int,
    weight: Int
  ): WorkoutMutationResponse {
    try {
      val workout = workoutService.addSet(
        workoutId.toInt(),
        description,
        com.caseymcguiredotcom.dao.ExerciseType.valueOf(
          exerciseType.name
        ),
        numReps,
        weight
      )

      return SuccessfulWorkoutMutationResponse(
        success = true,
        workout = Workout(
          id = workout.id.toString(),
          description = workout.description,
          sets = workout.sets.map {
            WorkoutSet(
              id = it.id.toString(),
              exerciseType = ExerciseType.DUMBBELL_BENCH_PRESS,
              numReps = it.numReps,
              weight = it.weight
            )
          }
        )
      )
    } catch (e: Exception) {
      return DEFAULT_FAILED_WORKOUT_RESPONSE
    }
  }

  @DgsMutation
  fun createExercise(name: String): ExerciseMutationResponse {
    try {
      val newlyCreatedExerciseId = workoutService.createExercise(name)
      val exercise = workoutService.getExerciseById(newlyCreatedExerciseId)
        ?: throw EntityNotFoundException()
      return SuccessfulExerciseMutationResponse(
        success = true,
        exercise = Exercise(
          id = exercise.id.toString(),
          name = exercise.name
        )
      )
    } catch (e: Exception) {
      return DEFAULT_FAILED_EXERCISE_RESPONSE
    }
  }

}