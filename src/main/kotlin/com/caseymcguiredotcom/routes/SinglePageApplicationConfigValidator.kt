package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinitionValidator
import org.springframework.stereotype.Component

@Component
class SinglePageApplicationConfigValidator(
  routeConfigs: List<SinglePageApplicationConfig>
) {
  init {
    validate(routeConfigs)
  }

  companion object {
    fun validate(routeConfigs: List<SinglePageApplicationConfig>) {
      SpaApplicationDefinitionValidator.validate(routeConfigs.map { it.application })

      routeConfigs.forEach { config ->
        validateRouteRules(config)
      }
    }

    private fun validateRouteRules(config: SinglePageApplicationConfig) {
      val routeIds = config.routes.map { it.id }.toSet()
      val invalidRuleRouteKeys = config.routeRules.keys
        .filter {
          it.applicationId != config.applicationId || !routeIds.contains(it.routeId)
        }

      require(invalidRuleRouteKeys.isEmpty()) {
        "Single page application ${config.applicationId} has route rules for unknown routes: ${
          invalidRuleRouteKeys.joinToString(", ") { "${it.applicationId}:${it.routeId}" }
        }"
      }
    }
  }
}
