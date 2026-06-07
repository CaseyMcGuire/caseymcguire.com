package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.sparoutecontract.SpaRouteDefinition

data class SinglePageApplicationRouteRegistration(
  val application: SinglePageApplicationConfig,
  val route: SpaRouteDefinition
)
