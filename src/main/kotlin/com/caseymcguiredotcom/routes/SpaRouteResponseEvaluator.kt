package com.caseymcguiredotcom.routes

import org.springframework.stereotype.Component

@Component
class SpaRouteResponseEvaluator(
  private val actionResolver: SpaRouteRuleActionResolver
) {
  fun evaluate(
    rules: List<SpaRouteRule>,
    request: SpaRouteRequest
  ): SpaRouteHttpResponse {
    for (rule in rules) {
      when (val result = rule.evaluate(request)) {
        SpaRouteRuleResult.Allow -> return SpaRouteHttpResponse.ok()
        is SpaRouteRuleResult.Deny -> return actionResolver.resolve(result.action)
        SpaRouteRuleResult.Skip -> Unit
      }
    }

    return SpaRouteHttpResponse.ok()
  }
}
