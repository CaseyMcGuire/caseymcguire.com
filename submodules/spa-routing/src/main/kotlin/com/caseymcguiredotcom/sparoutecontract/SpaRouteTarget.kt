package com.caseymcguiredotcom.sparoutecontract

data class SpaRouteTarget(
  val applicationId: String,
  val routeId: String,
  val parameters: Map<String, String> = emptyMap()
)
