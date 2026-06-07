package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequireAdmin
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SpaRouteRule
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.applications.AiChatSpaApplication
import com.caseymcguiredotcom.views.AiChatPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse

@Component
class AiChatConfig(
  private val requireAdmin: RequireAdmin
) : SinglePageApplicationConfig {
  override val application: SpaApplicationDefinition = AiChatSpaApplication
  override val rules: List<SpaRouteRule> = listOf(requireAdmin)

  override fun renderHtml(): ServerResponse {
    return ServerResponse.ok()
      .contentType(MediaType.TEXT_HTML)
      .body(AiChatPage().render())
  }
}
