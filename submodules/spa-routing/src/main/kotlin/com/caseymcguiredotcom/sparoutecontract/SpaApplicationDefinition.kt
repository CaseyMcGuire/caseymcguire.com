package com.caseymcguiredotcom.sparoutecontract

interface SpaApplicationDefinition {
  val id: String
  val name: String
  val urlPrefix: String
  val appRootPath: String
  val routes: List<SpaRouteDefinition>
  val bundleName: String
    get() = id

  fun getFullUrl(route: SpaRouteDefinition): String {
    return getFullUrl(route.path)
  }

  fun getFullUrl(path: String): String {
    return when {
      path.isEmpty() -> "/${urlPrefix}"
      urlPrefix.isEmpty() -> "/$path"
      else -> "/${urlPrefix}/$path"
    }
  }
}
