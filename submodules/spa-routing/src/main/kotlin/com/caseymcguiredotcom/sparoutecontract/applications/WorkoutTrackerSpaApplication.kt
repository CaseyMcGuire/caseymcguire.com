package com.caseymcguiredotcom.sparoutecontract.applications

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.int
import com.caseymcguiredotcom.sparoutecontract.route

object WorkoutTrackerSpaApplication : SpaApplicationDefinition {
  override val id = "workout_tracker"
  override val name = "Workout Tracker"
  override val urlPrefix = "workout_tracker"
  override val appRootPath = "./src/main/web-frontend/apps/WorkoutTracker/WorkoutTrackerRoot"
  override val routes = listOf(
    route("", "WorkoutIndex"),
    route("workout", "ViewWorkouts"),
    route("workout/{id:\\d+}", "ViewWorkout", parameters = listOf(int("id"))),
    route("workout/create", "CreateWorkout"),
    route("workout/{id}/update", "UpdateWorkout", parameters = listOf(int("id"))),
    route("exercise", "ExerciseIndex"),
    route("exercise/create", "CreateExercise"),
    route("workout/history", "WorkoutHistory")
  )
}
