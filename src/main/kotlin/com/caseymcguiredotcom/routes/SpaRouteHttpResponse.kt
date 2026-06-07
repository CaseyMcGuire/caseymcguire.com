package com.caseymcguiredotcom.routes

import org.springframework.http.HttpHeaders
import org.springframework.web.servlet.function.ServerResponse

data class SpaRouteHttpResponse(
  val statusCode: Int,
  val location: String? = null
) {
  companion object {
    fun ok() = SpaRouteHttpResponse(200)
    fun badRequest() = SpaRouteHttpResponse(400)
    fun notFound() = SpaRouteHttpResponse(404)
    fun found(location: String) = SpaRouteHttpResponse(302, location)
  }
}

fun SpaRouteHttpResponse.toServerResponse(): ServerResponse? {
  if (statusCode == 200) {
    return null
  }

  val response = ServerResponse.status(statusCode)
  if (location != null) {
    response.header(HttpHeaders.LOCATION, location)
  }

  return response.build()
}
