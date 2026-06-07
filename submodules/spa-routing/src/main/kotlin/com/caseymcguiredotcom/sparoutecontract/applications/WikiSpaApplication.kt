package com.caseymcguiredotcom.sparoutecontract.applications

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.route
import com.caseymcguiredotcom.sparoutecontract.string

object WikiSpaApplication : SpaApplicationDefinition {
  override val id = "wiki"
  override val name = "Wiki"
  override val urlPrefix = "wiki"
  override val appRootPath = "./src/main/web-frontend/apps/Wiki/WikiRoot.tsx"
  override val routes = listOf(
    route("", "WikiHome"),
    route("new", "NewWikiPage"),
    route("{wikiId}", "WikiIndex", parameters = listOf(string("wikiId"))),
    route(
      "{wikiId}/{pageId}",
      "WikiPage",
      parameters = listOf(string("wikiId"), string("pageId"))
    ),
    route(
      "{wikiId}/{pageId}/edit",
      "EditWikiPage",
      parameters = listOf(string("wikiId"), string("pageId"))
    )
  )
}
