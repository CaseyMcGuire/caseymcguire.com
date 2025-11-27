package com.caseymcguiredotcom.routes

interface SinglePageApplicationConfig {
  val name: String
  val routes: List<SinglePageApplicationRoute>
  val urlPrefix: String
  val requestHandler: RequestHandler

  fun getFullUrls(): List<String> {
    return routes.map { getFullUrl(it.path) }
  }

  fun getFullUrl(path: String): String {
    return when {
      path.isEmpty() -> "/${urlPrefix}"
      urlPrefix.isEmpty() -> "/$path"
      else -> "/${urlPrefix}/$path"
    }
  }
}