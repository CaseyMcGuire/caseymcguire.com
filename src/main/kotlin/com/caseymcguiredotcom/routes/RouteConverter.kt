package com.caseymcguiredotcom.routes

import org.springframework.stereotype.Component

@Component
class RouteConverter {

  /** Written by Gemini 3. Hopefully this is right... */
  fun convertToReactRouter(springRoute: String): String {
    var route = springRoute

    // 1. Protect Recursive Wildcards (Ant Path /**)
    // We swap them to a safe placeholder so the single-wildcard logic doesn't mangle them.
    val splatPlaceholder = "__RR_SPLAT__"
    if (route.contains("/**")) {
      route = route.replace("/**", "/$splatPlaceholder")
    }

    // 2. Handle Single Segment Wildcards (Ant Path /*)
    // Spring matches one segment. React doesn't have a "one segment wildcard"
    // so we convert them to named parameters: :wildcard1, :wildcard2, etc.
    val singleWildcardRegex = "/\\*(?!\\*)".toRegex()
    var wildcardCounter = 0
    if (singleWildcardRegex.containsMatchIn(route)) {
      route = route.replace(singleWildcardRegex) {
        wildcardCounter++
        "/:wildcard$wildcardCounter"
      }
    }

    // 3. Restore Recursive Splats
    // Convert placeholder back to React Router's standard "*"
    if (route.contains(splatPlaceholder)) {
      route = route.replace("/$splatPlaceholder", "/*")
    }

    // 4. Validate React Router Splat Rules
    // React Router only allows one splat, and it must be at the end.
    val starCount = route.count { it == '*' }
    val isSplatAtEnd = route.endsWith("/*")

    if (starCount > 1) {
      throw IllegalArgumentException("CRITICAL: Multiple splats (*) detected. React Router supports only one per route.")
    } else if (starCount == 1 && !isSplatAtEnd) {
      throw IllegalArgumentException("CRITICAL: Mid-route splat detected. React Router requires '*' to be at the very end.")
    }

    // 5. Check for Partial Segments (Incompatible)
    // Looks for { or } that aren't bounded by slashes.
    val partialSegmentRegex = "(?<!/)\\{|\\}(?!/|$)".toRegex()
    if (partialSegmentRegex.containsMatchIn(route)) {
      throw IllegalArgumentException("WARNING: Partial segment (e.g. prefix-{id}) detected. React Router cannot handle this.")
    }

    // 6. Convert Spring Variables to React Params
    // Old: \{([^}:]+)(?::.*)?\}  <- Greedy, risky
    // New: \{([^}:]+)(?::[^}]*)?\} <- Safer, stops at '}'
    val variablePattern = "\\{([^}:]+)(?::[^}]*)?\\}".toRegex()
    route = variablePattern.replace(route) { match ->
      ":${match.groupValues[1]}"
    }

    return route
  }
}

data class ConversionResult(val route: String, val warning: String? = null)