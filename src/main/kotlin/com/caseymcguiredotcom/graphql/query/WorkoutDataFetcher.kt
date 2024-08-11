package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.*
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
    val FAILED_RESPONSE = FailedWorkoutMutationResponse(
      success = false,
      userFacingErrorMessage = "Something went wrong. Please try again"
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

  @DgsMutation
  fun createWorkout(description: String?): WorkoutMutationResponse {
    try {
      val workout = workoutService.createWorkout(description)
        ?: return FAILED_RESPONSE

      return SuccessfulWorkoutMutationResponse(
        success = true,
        workout = Workout(
          id = workout.id.toString(),
          description = workout.description,
          sets = emptyList()
        )
      )
    } catch (e: Exception) {
      return FAILED_RESPONSE
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
      return FAILED_RESPONSE
    }
  }

}