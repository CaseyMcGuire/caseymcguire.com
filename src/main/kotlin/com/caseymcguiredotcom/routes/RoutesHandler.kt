package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.sparoutecontract.SpaRouteDefinition
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.*

@Configuration
class RoutesHandler(
  private val routeResponseEvaluator: SpaRouteResponseEvaluator
) {

  @Bean
  fun routes(
    routeConfigs: List<SinglePageApplicationConfig>
  ): RouterFunction<ServerResponse> {
    return router {
      routeConfigs.forEach { config ->
        config.routes.forEach { route ->
          GET(config.getFullUrl(route)) { request ->
            handleSinglePageApplicationRoute(config, route, request)
          }
        }
      }
    }
  }

  private fun handleSinglePageApplicationRoute(
    config: SinglePageApplicationConfig,
    route: SpaRouteDefinition,
    request: ServerRequest
  ): ServerResponse {
    if (!route.hasValidParameterValues(request.pathVariables())) {
      return ServerResponse.badRequest().build()
    }

    val response = routeResponseEvaluator.evaluate(
      rules = config.rules + config.getRouteRules(route),
      request = request.toSpaRouteRequest(config, route)
    )
    return response.toServerResponse() ?: config.renderHtml()
  }
}
