package com.caseymcguiredotcom.sparoutecontract.applications

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.int
import com.caseymcguiredotcom.sparoutecontract.route

object BlogSpaApplication : SpaApplicationDefinition {
  override val id = "casey_mcguire"
  override val name = "Casey McGuire"
  override val urlPrefix = ""
  override val appRootPath = "./src/main/web-frontend/apps/MainApp/MainAppRoot.tsx"
  override val routes = listOf(
    route("", "BlogIndex"),
    route("resume", "Resume"),
    route("posts", "PostsIndex"),
    route("posts/new", "NewPost"),
    route("posts/{id}", "ViewPost", parameters = listOf(int("id"))),
    route("posts/{id}/edit", "EditPost", parameters = listOf(int("id"))),
    route("posts/page/{id}", "ViewPostsPage", parameters = listOf(int("id"))),
    route("login", "Login"),
    route("register", "Register"),
    route("tetris", "Tetris"),
    route("404", "NotFound"),
    route("500", "InternalServerError"),
    route("projects", "Projects"),
    route("nft-preview", "NftPreview")
  )
}
