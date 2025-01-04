package com.caseymcguiredotcom.controllers

import com.caseymcguiredotcom.views.BasePage
import com.caseymcguiredotcom.views.ReactPage
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
@PreAuthorize("hasRole('ADMIN')")
class WorkoutTrackerController {
  companion object {
    const val APP_PREFIX = "/workout_tracker"
  }
  // TODO: find some way of keeping these routes in sync with client-side routes
  @GetMapping(
    APP_PREFIX,
    "$APP_PREFIX/workout",
    "$APP_PREFIX/workout/{id:\\d+}",
    "$APP_PREFIX/workout/create",
    "$APP_PREFIX/workout/{id}/update",
    "$APP_PREFIX/exercise",
    "$APP_PREFIX/exercise/create"
  )
  @ResponseBody
  fun workout(): String {
    return ReactPage("workout", "Workout Tracker").render()
  }
}