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
    if (path.isEmpty()) {
      return "/${urlPrefix}"
    }
    return "/${urlPrefix}/${path}"
  }
}