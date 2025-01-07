package com.caseymcguiredotcom.controllers

import com.caseymcguiredotcom.views.ReactPage
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import routeannotatonprocessor.*

@RestController
@PreAuthorize("hasRole('ADMIN')")
@ReactRouterController("WorkoutTracker")
class WorkoutTrackerController {
  companion object {
    const val APP_PREFIX = "/workout_tracker"
  }
  @ReactRouterGetMapping(
    routes = [
      ReactRouterRoute(path = APP_PREFIX, "IndexRoute"),
      ReactRouterRoute(path = "$APP_PREFIX/workout", name = "ShowWorkoutsRoute"),
      ReactRouterRoute(path = "$APP_PREFIX/workout/{id:\\d+}", name = "ShowSingleWorkoutRoute"),
      ReactRouterRoute(path = "$APP_PREFIX/workout/create", "CreateWorkoutRoute"),
      ReactRouterRoute(path = "$APP_PREFIX/workout/{id}/update", "UpdateWorkoutRoute"),
      ReactRouterRoute("$APP_PREFIX/exercise", "ShowExercisesRoute"),
      ReactRouterRoute("$APP_PREFIX/exercise/create", "CreateExerciseRoute")
    ]
  )
  @ResponseBody
  fun workout(): String {
    return ReactPage("workout", "Workout Tracker").render()
  }
}