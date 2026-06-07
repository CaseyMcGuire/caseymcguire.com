package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.sparoutecontract.SpaRouteTarget

data class SpaRouteRuleAction(
  val statusCode: Int,
  val location: String? = null,
  val routeTarget: SpaRouteTarget? = null
) {
  init {
    require(statusCode in 300..599) {
      "SPA route deny actions must use a 3xx, 4xx, or 5xx status code: $statusCode"
    }
    require(location == null || routeTarget == null) {
      "SPA route deny actions must use either a raw location or a route target, not both."
    }
  }

  companion object {
    fun status(statusCode: Int): SpaRouteRuleAction {
      return SpaRouteRuleAction(statusCode)
    }

    fun notFound(): SpaRouteRuleAction {
      return status(404)
    }

    fun internalServerError(): SpaRouteRuleAction {
      return status(500)
    }

    fun redirect(location: String, statusCode: Int = 302): SpaRouteRuleAction {
      return SpaRouteRuleAction(statusCode, location = location)
    }

    fun redirectTo(target: SpaRouteTarget, statusCode: Int = 302): SpaRouteRuleAction {
      return SpaRouteRuleAction(statusCode, routeTarget = target)
    }
  }
}
