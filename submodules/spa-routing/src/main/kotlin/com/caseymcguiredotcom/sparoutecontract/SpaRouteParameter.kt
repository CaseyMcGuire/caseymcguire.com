package com.caseymcguiredotcom.sparoutecontract

import java.util.UUID

data class SpaRouteParameter(
  val name: String,
  val type: SpaRouteParameterType,
  val optional: Boolean = false
) {
  init {
    require(name.isNotBlank()) {
      "SPA route parameter name must not be blank."
    }
  }

  fun hasValidValue(value: String): Boolean {
    return when (type) {
      SpaRouteParameterType.STRING -> true
      SpaRouteParameterType.INT -> value.toIntOrNull() != null
      SpaRouteParameterType.UUID -> runCatching { UUID.fromString(value) }.isSuccess
    }
  }

  fun optional(): SpaRouteParameter {
    return copy(optional = true)
  }
}
