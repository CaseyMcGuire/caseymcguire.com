package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.sparoutecontract.SpaRouteDefinition
import org.springframework.web.servlet.function.ServerRequest

fun ServerRequest.toSpaRouteRequest(
  application: SinglePageApplicationConfig,
  route: SpaRouteDefinition
): SpaRouteRequest {
  return SpaRouteRequest(
    applicationId = application.applicationId,
    routeId = route.id,
    method = method().name(),
    path = path(),
    pathParameters = pathVariables(),
    queryParameters = params().mapValues { (_, values) -> values.toList() },
    headers = headers().asHttpHeaders()
      .headerSet()
      .associate { (name, values) -> name to values.toList() }
  )
}
