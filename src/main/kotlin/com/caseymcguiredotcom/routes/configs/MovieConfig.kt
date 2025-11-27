package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import com.caseymcguiredotcom.views.BlogPage
import com.caseymcguiredotcom.views.ReactPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class MovieConfig : SinglePageApplicationConfig {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("movies", "MOVIES_INDEX"),
    SinglePageApplicationRoute("tv", "TELEVISION_INDEX")
  )

  override val name: String = "Movies"
  override val urlPrefix: String = "movie_app"
  override val requestHandler: RequestHandler = object : RequestHandler {
    override fun handle(request: ServerRequest): ServerResponse {
      return ServerResponse.ok()
        .contentType(MediaType.TEXT_HTML)
        .body(
          ReactPage("movies", "Movies")
            .render()
        )
    }
  }
}
