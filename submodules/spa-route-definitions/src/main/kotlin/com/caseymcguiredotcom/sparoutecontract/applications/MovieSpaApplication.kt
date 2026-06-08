package com.caseymcguiredotcom.sparoutecontract.applications

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.route

object MovieSpaApplication : SpaApplicationDefinition {
  override val id = "movies"
  override val name = "Movies"
  override val urlPrefix = "movie_app"
  override val appRootPath = "./src/main/web-frontend/apps/MovieApp/MovieAppRoot"
  override val routes = listOf(
    route("movies", "MoviesIndex"),
    route("tv", "TelevisionIndex")
  )
}
