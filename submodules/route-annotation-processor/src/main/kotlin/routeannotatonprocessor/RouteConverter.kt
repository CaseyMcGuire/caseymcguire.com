package routeannotatonprocessor

/**
 * Utility class for converting Spring URL patterns to React Router patterns
 */
object RouteConverter {

/**
  * Converts Spring-style URL patterns to React Router compatible patterns
  *
  * Spring patterns:
  * - {variable} -> :variable
  * - {*wildcard} -> *
 *  - / ** -> *  // note there should not be a space between the slash and first star but Intellij bugged out
 * - Optional parameters with regex: {variable:[a-z]+} -> :variable
 * - Matrix variables: ;matrix=value -> removed
 * - Query parameters: handled separately by React Router
 *
 * @param springPath The Spring-style URL pattern
 * @return React Router compatible pattern
 **/
  fun convertSpringToReactRouter(springPath: String): String {
    if (springPath.isBlank()) {
      return "/"
    }

    return springPath
      // Convert /** wildcard pattern
      .replace(Regex("/\\*\\*$"), "/*")
      // Remove matrix variables (;param=value)
      .replace(Regex(";[^/]+"), "")
      // Convert {*wildcard} to *
      .replace(Regex("\\{?\\*[^}]*}?"), "*")
      // Convert Spring path variables with regex patterns {variable:[pattern]} to :variable
      .replace(Regex("\\{([^:}]+):[^}]+}"), ":$1")
      // Convert remaining Spring path variables {variable} to :variable
      .replace(Regex("\\{([^}]+)}"), ":$1")
      // Remove query parameters
      .split("?")[0]
      // Ensure path starts with /
      .let { if (it.startsWith("/")) it else "/$it" }
      // Remove trailing slash except for root path
      .let { if (it != "/" && it.endsWith("/")) it.dropLast(1) else it }
  }

  /**
   * Extension function to convert Spring path to React Router path
   */
  fun String.toReactRouterPath(): String = convertSpringToReactRouter(this)
}