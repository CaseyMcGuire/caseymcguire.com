package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.handlers.WorkoutTrackerRouteHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.*

@Configuration
class WorkoutTrackerRouteConfig(private val workoutTrackerRouteHandler: WorkoutTrackerRouteHandler) {

  companion object {
    const val APP_PREFIX = "/workout_tracker"
  }

  val routeStrings = listOf(
    APP_PREFIX,
    "${APP_PREFIX}/workout",
    "${APP_PREFIX}/workout/{id:\\d+}",
    "${APP_PREFIX}/workout/create",
    "${APP_PREFIX}/workout/{id}/update",
    "${APP_PREFIX}/exercise",
    "${APP_PREFIX}/exercise/create"
  )

  @Bean
  fun routes(): RouterFunction<ServerResponse> {
    return router {
      routeStrings.map { GET(it, workoutTrackerRouteHandler::handleWorkoutPage)
      }
    }
  }
}