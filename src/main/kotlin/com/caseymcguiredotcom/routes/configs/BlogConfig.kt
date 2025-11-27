package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import com.caseymcguiredotcom.views.BlogPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class BlogConfig() : SinglePageApplicationConfig {
  override val routes = listOf(
    SinglePageApplicationRoute("", "BLOG_INDEX"),
    SinglePageApplicationRoute("resume", "RESUME"),
    SinglePageApplicationRoute("posts", "POSTS_INDEX"),
    SinglePageApplicationRoute("posts/{id}", "VIEW_POST"),
    SinglePageApplicationRoute("posts/{id}/edit", "EDIT_POST"),
    SinglePageApplicationRoute("posts/page/{id}", "VIEW_POSTS_PAGE"),
    SinglePageApplicationRoute("posts/new", "NEW_POST"),
    SinglePageApplicationRoute("login", "LOGIN"),
    SinglePageApplicationRoute("register", "REGISTER"),
    SinglePageApplicationRoute("tetris", "TETRIS"),
    SinglePageApplicationRoute("projects", "PROJECTS"),
    SinglePageApplicationRoute("nft-preview", "NFT_PREVIEW")
  )

  override val name = "Casey McGuire"
  override val urlPrefix = ""

  override val requestHandler = object: RequestHandler {
    override fun handle(request: ServerRequest): ServerResponse {
      return ServerResponse.ok()
        .contentType(MediaType.TEXT_HTML)
        .body(BlogPage().render())
    }
  }


}