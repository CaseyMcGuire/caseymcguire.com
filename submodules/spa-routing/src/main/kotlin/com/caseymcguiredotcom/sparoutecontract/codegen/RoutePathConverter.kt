package com.caseymcguiredotcom.sparoutecontract.codegen

class RoutePathConverter {
  fun convertToReactRouter(springRoute: String): String {
    var route = springRoute

    val splatPlaceholder = "__RR_SPLAT__"
    if (route.contains("/**")) {
      route = route.replace("/**", "/$splatPlaceholder")
    }

    val singleWildcardRegex = "/\\*(?!\\*)".toRegex()
    var wildcardCounter = 0
    if (singleWildcardRegex.containsMatchIn(route)) {
      route = route.replace(singleWildcardRegex) {
        wildcardCounter++
        "/:wildcard$wildcardCounter"
      }
    }

    if (route.contains(splatPlaceholder)) {
      route = route.replace("/$splatPlaceholder", "/*")
    }

    val starCount = route.count { it == '*' }
    val isSplatAtEnd = route.endsWith("/*")

    if (starCount > 1) {
      throw IllegalArgumentException("Multiple splats (*) detected. React Router supports only one per route.")
    } else if (starCount == 1 && !isSplatAtEnd) {
      throw IllegalArgumentException("Mid-route splat detected. React Router requires '*' to be at the very end.")
    }

    val partialSegmentRegex = "(?<!/)\\{|\\}(?!/|$)".toRegex()
    if (partialSegmentRegex.containsMatchIn(route)) {
      throw IllegalArgumentException("Partial segment detected. React Router cannot handle this route: $springRoute")
    }

    val variablePattern = "\\{([^}:]+)(?::[^}]*)?\\}".toRegex()
    route = variablePattern.replace(route) { match ->
      ":${match.groupValues[1]}"
    }

    return route
  }
}
