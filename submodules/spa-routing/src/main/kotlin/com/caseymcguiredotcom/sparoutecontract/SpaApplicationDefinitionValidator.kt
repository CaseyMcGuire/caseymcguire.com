package com.caseymcguiredotcom.sparoutecontract

object SpaApplicationDefinitionValidator {
  fun validate(applications: List<SpaApplicationDefinition>) {
    val duplicateApplicationIds = applications
      .map { it.id }
      .duplicates()
    require(duplicateApplicationIds.isEmpty()) {
      "Duplicate single page application IDs: ${duplicateApplicationIds.joinToString(", ")}"
    }

    applications.forEach { application ->
      validateRouteIds(application)
      validateRouteUrls(application)
    }
  }

  private fun validateRouteIds(application: SpaApplicationDefinition) {
    val duplicateRouteIds = application.routes
      .map { it.id }
      .duplicates()
    require(duplicateRouteIds.isEmpty()) {
      "Single page application ${application.id} has duplicate route IDs: ${
        duplicateRouteIds.joinToString(", ")
      }"
    }
  }

  private fun validateRouteUrls(application: SpaApplicationDefinition) {
    val duplicateRouteUrls = application.routes
      .map { application.getFullUrl(it) }
      .duplicates()
    require(duplicateRouteUrls.isEmpty()) {
      "Single page application ${application.id} has duplicate route URLs: ${
        duplicateRouteUrls.joinToString(", ")
      }"
    }
  }

  private fun <T> List<T>.duplicates(): List<T> {
    return groupingBy { it }
      .eachCount()
      .filterValues { it > 1 }
      .keys
      .toList()
  }
}
