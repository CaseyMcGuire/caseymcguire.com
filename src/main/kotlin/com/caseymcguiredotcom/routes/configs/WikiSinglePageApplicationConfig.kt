package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.generated.spa.routes.WikiRoutes
import com.caseymcguiredotcom.routes.RequireAdmin
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SpaRouteRule
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.SpaRouteKey
import com.caseymcguiredotcom.sparoutecontract.applications.WikiSpaApplication
import com.caseymcguiredotcom.views.WikiPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse

@Component
class WikiSinglePageApplicationConfig(
  private val requireAdmin: RequireAdmin
) : SinglePageApplicationConfig  {
  override val application: SpaApplicationDefinition = WikiSpaApplication
  override val routeRules: Map<SpaRouteKey, List<SpaRouteRule>> = mapOf(
    WikiRoutes.NewWikiPage to listOf(requireAdmin),
    WikiRoutes.EditWikiPage to listOf(requireAdmin)
  )

  override fun renderHtml(): ServerResponse {
    return ServerResponse.ok()
      .contentType(MediaType.TEXT_HTML)
      .body(
        WikiPage(this)
          .render()
      )
  }
}
