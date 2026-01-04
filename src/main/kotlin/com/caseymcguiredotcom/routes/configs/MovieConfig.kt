package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.DefaultRequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import org.springframework.stereotype.Component

@Component
class MovieConfig : SinglePageApplicationConfig {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("movies", "MOVIES_INDEX"),
    SinglePageApplicationRoute("tv", "TELEVISION_INDEX")
  )

  override val name: String = "Movies"
  override val urlPrefix: String = "movie_app"
  override val appRootPath = "./src/main/web-frontend/apps/MovieApp/MovieAppRoot"
  override val requestHandler = DefaultRequestHandler()
}
