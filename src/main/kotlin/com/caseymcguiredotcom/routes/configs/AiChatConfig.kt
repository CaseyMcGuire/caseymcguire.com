package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import com.caseymcguiredotcom.views.AiChatPage
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class AiChatConfig : SinglePageApplicationConfig {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("", "AI_CHAT_INDEX"),
    SinglePageApplicationRoute("chat/{conversationId}", "VIEW_CHAT"),
  )

  override val name: String = "AI Chat"
  override val urlPrefix: String = "ai_chat"
  override val appRootPath = "./src/main/web-frontend/apps/AiChat/AiChatRoot"
  override val requestHandler = object : RequestHandler {
    override fun handle(request: ServerRequest, config: SinglePageApplicationConfig): ServerResponse {
      return ServerResponse.ok()
        .contentType(MediaType.TEXT_HTML)
        .body(AiChatPage().render())
    }
  }
}