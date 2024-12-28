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
            numReps = it.numReps,
            weight = it.weight
          )
        }
      )
    }
  }

  fun models.Workout.toGraphqlType(): Workout {
    return Workout(
      id = this.id.toString(),
      description = this.description,
      sets = this.sets.map {
        WorkoutSet(
          id = it.id.toString(),
          numReps = it.numReps,
          weight = it.weight
        )
      }
    )
  }

  @DgsData(
    parentType = DgsConstants.WORKOUTTRACKER.TYPE_NAME,
    field = DgsConstants.WORKOUTTRACKER.WorkoutById
  )
  fun getWorkoutById(id: String): Workout? {
    val idNum = id.toIntOrNull() ?:
      throw IllegalArgumentException("$id is not a valid ID. Must be a integer.")
    return workoutService.getWorkoutById(idNum)
      ?.toGraphqlType()
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
    exerciseId: String,
    description: String,
    numReps: Int,
    weight: Int
  ): WorkoutMutationResponse {
    try {
      val workout = workoutService.addSet(
        workoutId.toInt(),
        exerciseId.toInt(),
        description,
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

  @DgsData(
    parentType = DgsConstants.WORKOUTTRACKER.TYPE_NAME,
    field = DgsConstants.WORKOUTTRACKER.Exercises
  )
  fun getExercises(): List<Exercise> {
    return workoutService.getExercises().map {
      Exercise(
        id = it.id.toString(),
        name = it.name
      )
    }
  }

}