package com.caseymcguiredotcom.routes

data class SpaRouteRequest(
  val applicationId: String,
  val routeId: String,
  val method: String,
  val path: String,
  val pathParameters: Map<String, String> = emptyMap(),
  val queryParameters: Map<String, List<String>> = emptyMap(),
  val headers: Map<String, List<String>> = emptyMap()
) {
  fun pathParameter(name: String): String? {
    return pathParameters[name]
  }

  fun queryParameter(name: String): String? {
    return queryParameters[name]?.firstOrNull()
  }

  fun header(name: String): List<String> {
    return headers.entries
      .firstOrNull { it.key.equals(name, ignoreCase = true) }
      ?.value
      .orEmpty()
  }
}
