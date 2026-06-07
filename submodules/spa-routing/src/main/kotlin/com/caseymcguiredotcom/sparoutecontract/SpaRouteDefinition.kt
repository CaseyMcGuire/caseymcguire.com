package com.caseymcguiredotcom.sparoutecontract

data class SpaRouteDefinition(
  val path: String,
  val id: String,
  val parameters: List<SpaRouteParameter> = emptyList()
) {
  init {
    require(id.isNotBlank()) {
      "SPA route id must not be blank."
    }

    require(ROUTE_ID_PATTERN.matches(id)) {
      "SPA route id must be a PascalCase Kotlin identifier: $id"
    }

    val pathParameterNames = pathParameterNames()
    val routeParameterNames = parameters.map { it.name }

    require(routeParameterNames.toSet().size == routeParameterNames.size) {
      "Route $id has duplicate parameter metadata: ${routeParameterNames.joinToString(", ")}"
    }

    val routeParameterNameSet = routeParameterNames.toSet()
    require(pathParameterNames == routeParameterNameSet) {
      buildString {
        append("Route $id must explicitly specify parameter metadata matching path parameters.")

        val missingParameters = pathParameterNames - routeParameterNameSet
        if (missingParameters.isNotEmpty()) {
          append(" Missing: ${missingParameters.joinToString(", ")}.")
        }

        val extraParameters = routeParameterNameSet - pathParameterNames
        if (extraParameters.isNotEmpty()) {
          append(" Extra: ${extraParameters.joinToString(", ")}.")
        }
      }
    }
  }

  fun hasValidParameterValues(parameterValues: Map<String, String>): Boolean {
    val parameterNames = parameters.map { it.name }.toSet()
    val unknownParameters = parameterValues.keys - parameterNames
    if (unknownParameters.isNotEmpty()) {
      return false
    }

    val missingRequiredParameters = requiredParameters()
      .map { it.name }
      .toSet() - parameterValues.keys
    if (missingRequiredParameters.isNotEmpty()) {
      return false
    }

    return parameters.all { parameter ->
      val value = parameterValues[parameter.name] ?: return@all true
      parameter.hasValidValue(value)
    }
  }

  fun requiredParameters(): List<SpaRouteParameter> {
    return parameters.filter { !it.optional }
  }

  fun resolvePath(parameterValues: Map<String, String>): String {
    return PATH_PARAMETER_PATTERN.replace(path) { match ->
      val name = match.groupValues[1]
      parameterValues[name] ?: match.value
    }
  }

  private fun pathParameterNames(): Set<String> {
    val names = PATH_PARAMETER_PATTERN
      .findAll(path)
      .map { it.groupValues[1] }
      .toList()

    require(names.toSet().size == names.size) {
      "Route $id has duplicate path parameters: ${names.joinToString(", ")}"
    }

    return names.toSet()
  }

  companion object {
    private val PATH_PARAMETER_PATTERN = "\\{([^}:]+)(?::[^}]*)?\\}".toRegex()
    private val ROUTE_ID_PATTERN = "[A-Z][A-Za-z0-9]*".toRegex()
  }
}
