package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.generated.spa.routes.CaseyMcGuireRoutes
import com.caseymcguiredotcom.routes.RequireAdmin
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SpaRouteRule
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.SpaRouteKey
import com.caseymcguiredotcom.sparoutecontract.applications.BlogSpaApplication
import com.caseymcguiredotcom.views.BlogPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse

@Component
class BlogConfig(
  private val requireAdmin: RequireAdmin
) : SinglePageApplicationConfig {
  override val application: SpaApplicationDefinition = BlogSpaApplication
  override val routeRules: Map<SpaRouteKey, List<SpaRouteRule>> = mapOf(
    CaseyMcGuireRoutes.NewPost to listOf(requireAdmin),
    CaseyMcGuireRoutes.EditPost to listOf(requireAdmin)
  )

  override fun renderHtml(): ServerResponse {
    return ServerResponse.ok()
      .contentType(MediaType.TEXT_HTML)
      .body(BlogPage().render())
  }
}
