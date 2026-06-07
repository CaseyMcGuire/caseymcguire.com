package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.generated.spa.routes.CaseyMcGuireRoutes
import com.caseymcguiredotcom.services.SessionService
import org.springframework.stereotype.Component

@Component
class RequireAdmin(
  private val sessionService: SessionService
) : SpaRouteRule {
  override fun evaluate(request: SpaRouteRequest): SpaRouteRuleResult {
    val user = sessionService.getLoggedInUser()
    return when {
      user == null -> SpaRouteRuleResult.Deny(SpaRouteRuleAction.redirectTo(CaseyMcGuireRoutes.Login()))
      !user.isAdmin() -> SpaRouteRuleResult.Deny(SpaRouteRuleAction.notFound())
      else -> SpaRouteRuleResult.Allow
    }
  }
}
