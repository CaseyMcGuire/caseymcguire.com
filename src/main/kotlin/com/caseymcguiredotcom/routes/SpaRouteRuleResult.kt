package com.caseymcguiredotcom.routes

sealed interface SpaRouteRuleResult {
  data object Skip : SpaRouteRuleResult
  data object Allow : SpaRouteRuleResult
  data class Deny(val action: SpaRouteRuleAction) : SpaRouteRuleResult
}
