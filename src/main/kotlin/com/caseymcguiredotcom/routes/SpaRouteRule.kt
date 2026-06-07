package com.caseymcguiredotcom.routes

interface SpaRouteRule {
  fun evaluate(request: SpaRouteRequest): SpaRouteRuleResult
}
