package com.caseymcguiredotcom.sparoutecontract

fun route(
  path: String,
  id: String,
  parameters: List<SpaRouteParameter> = emptyList()
): SpaRouteDefinition {
  return SpaRouteDefinition(path, id, parameters)
}

fun string(name: String): SpaRouteParameter {
  return SpaRouteParameter(name, SpaRouteParameterType.STRING)
}

fun int(name: String): SpaRouteParameter {
  return SpaRouteParameter(name, SpaRouteParameterType.INT)
}

fun uuid(name: String): SpaRouteParameter {
  return SpaRouteParameter(name, SpaRouteParameterType.UUID)
}
