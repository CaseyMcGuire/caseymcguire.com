package com.caseymcguiredotcom.routes

import org.springframework.stereotype.Component

@Component
class SinglePageApplicationRouteRegistry(
  routeConfigs: List<SinglePageApplicationConfig>
) {
  private val routesByKey = routeConfigs
    .flatMap { application ->
      application.routes.map { route ->
        SinglePageApplicationRouteRegistration(
          application = application,
          route = route
        )
      }
    }
    .associateByUnique { registration ->
      RouteKey(
        applicationId = registration.application.applicationId,
        routeId = registration.route.id
      )
    }

  fun findByApplicationAndRouteId(
    applicationId: String,
    routeId: String
  ): SinglePageApplicationRouteRegistration? {
    return routesByKey[RouteKey(applicationId, routeId)]
  }

  private data class RouteKey(
    val applicationId: String,
    val routeId: String
  )

  private fun <T, K> Iterable<T>.associateByUnique(keySelector: (T) -> K): Map<K, T> {
    val result = mutableMapOf<K, T>()
    for (element in this) {
      val key = keySelector(element)
      require(!result.containsKey(key)) {
        "Duplicate SPA route registration: $key"
      }
      result[key] = element
    }
    return result
  }
}
