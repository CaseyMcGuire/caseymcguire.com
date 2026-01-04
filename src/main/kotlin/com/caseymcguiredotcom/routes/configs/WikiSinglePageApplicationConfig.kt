package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import com.caseymcguiredotcom.views.WikiPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class WikiSinglePageApplicationConfig : SinglePageApplicationConfig  {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("", "WIKI_INDEX"),
    SinglePageApplicationRoute("{wikiName}/{pageId}", "WIKI_PAGE"),
    SinglePageApplicationRoute("{wikiName}/{pageId}/edit", "EDIT_WIKI_PAGE")
  )
  override val name: String = "Wiki"
  override val urlPrefix: String = "wiki"
  override val appRootPath = "./src/main/web-frontend/apps/Wiki/WikiRoot.tsx"
  override val requestHandler = object : RequestHandler {
    override fun handle(
      request: ServerRequest,
      config: SinglePageApplicationConfig
    ): ServerResponse {
      return ServerResponse.ok()
        .contentType(MediaType.TEXT_HTML)
        .body(
          WikiPage(config)
            .render()
        )
    }
  }
}