package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.handlers.WorkoutTrackerRequestHandler
import org.springframework.stereotype.Component

@Component
class WorkoutTrackerConfig(
  workoutTrackerRouteHandler: WorkoutTrackerRequestHandler
) : SinglePageApplicationConfig {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("", "WORKOUT_INDEX"),
    SinglePageApplicationRoute("workout", "VIEW_WORKOUTS"),
    SinglePageApplicationRoute("workout/{id:\\d+}", "VIEW_WORKOUT"),
    SinglePageApplicationRoute("workout/create", "CREATE_WORKOUT"),
    SinglePageApplicationRoute("workout/{id}/update", "UPDATE_WORKOUT"),
    SinglePageApplicationRoute("exercise", "EXERCISE_INDEX"),
    SinglePageApplicationRoute("exercise/create", "CREATE_EXERCISE"),
    SinglePageApplicationRoute("workout/history", "WORKOUT_HISTORY"),
  )

  override val name = "Workout Tracker"
  override val urlPrefix = "workout_tracker"
  override val requestHandler = workoutTrackerRouteHandler
}