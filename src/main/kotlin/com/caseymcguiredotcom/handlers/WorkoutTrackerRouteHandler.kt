package com.caseymcguiredotcom.handlers

import com.caseymcguiredotcom.views.ReactPage
import org.springframework.http.MediaType
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.ServerResponse.ok


@Component
@PreAuthorize("hasRole('ADMIN')")
class WorkoutTrackerRouteHandler {
  fun handleWorkoutPage(request: ServerRequest): ServerResponse =
    ok().contentType(MediaType.TEXT_HTML)
      .body(
        ReactPage("workout", "Workout Tracker").render()
      )

}