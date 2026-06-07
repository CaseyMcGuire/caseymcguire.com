package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.DgsConstants
import com.caseymcguiredotcom.codegen.graphql.types.SpaRouteHttpResponse
import com.caseymcguiredotcom.codegen.graphql.types.SpaRouteParameterInput
import com.caseymcguiredotcom.routes.SinglePageApplicationRouteRegistry
import com.caseymcguiredotcom.routes.SpaRouteRequest
import com.caseymcguiredotcom.routes.SpaRouteHttpResponse as RouteHttpResponse
import com.caseymcguiredotcom.routes.SpaRouteResponseEvaluator
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument
import com.netflix.graphql.dgs.context.DgsContext

@DgsComponent
class SpaRouteResponseFetcher(
  private val routeRegistry: SinglePageApplicationRouteRegistry,
  private val routeResponseEvaluator: SpaRouteResponseEvaluator
) {
  @DgsQuery(field = DgsConstants.QUERY.SpaRouteResponse)
  fun spaRouteResponse(
    @InputArgument applicationId: String,
    @InputArgument routeId: String,
    @InputArgument parameters: List<SpaRouteParameterInput>?,
    dfe: DgsDataFetchingEnvironment
  ): SpaRouteHttpResponse {
    val match = routeRegistry.findByApplicationAndRouteId(
      applicationId = applicationId,
      routeId = routeId
    ) ?: return RouteHttpResponse.notFound().toGraphqlType()

    val routeParameters = parameters.orEmpty()
    val parameterNames = routeParameters.map { it.name }
    if (parameterNames.toSet().size != parameterNames.size) {
      return RouteHttpResponse.badRequest().toGraphqlType()
    }

    val parameterValues = routeParameters.associate { it.name to it.value }
    if (!match.route.hasValidParameterValues(parameterValues)) {
      return RouteHttpResponse.badRequest().toGraphqlType()
    }

    val request = SpaRouteRequest(
      applicationId = match.application.applicationId,
      routeId = match.route.id,
      method = "GET",
      path = match.application.getFullUrl(match.route.resolvePath(parameterValues)),
      pathParameters = parameterValues,
      headers = dfe.requestHeaders()
    )

    return routeResponseEvaluator.evaluate(
      match.application.rules + match.application.getRouteRules(match.route),
      request
    )
      .toGraphqlType()
  }

  private fun DgsDataFetchingEnvironment.requestHeaders(): Map<String, List<String>> {
    return DgsContext.getRequestData(this)
      ?.headers
      ?.headerSet()
      ?.associate { (name, values) -> name to values.toList() }
      .orEmpty()
  }

  private fun RouteHttpResponse.toGraphqlType(): SpaRouteHttpResponse {
    return SpaRouteHttpResponse(
      statusCode = statusCode,
      location = location
    )
  }
}
