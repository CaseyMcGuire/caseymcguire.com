package com.caseymcguiredotcom.sparoutecontract

open class SpaTypedRoute(
  override val applicationId: String,
  override val routeId: String
) : SpaRouteKey {
  operator fun invoke(): SpaRouteTarget {
    return target()
  }

  protected fun target(parameters: Map<String, String> = emptyMap()): SpaRouteTarget {
    return SpaRouteTarget(
      applicationId = applicationId,
      routeId = routeId,
      parameters = parameters
    )
  }
}
