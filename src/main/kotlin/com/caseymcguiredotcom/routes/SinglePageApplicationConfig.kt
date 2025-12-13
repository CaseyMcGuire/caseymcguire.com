package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.views.ReactPage
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

interface SinglePageApplicationConfig {
  val name: String
  val routes: List<SinglePageApplicationRoute>
  val urlPrefix: String
  val appRootPath: String
  val requestHandler: RequestHandler

  val bundleName
    get() = name.lowercase().replace(" ", "_")

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