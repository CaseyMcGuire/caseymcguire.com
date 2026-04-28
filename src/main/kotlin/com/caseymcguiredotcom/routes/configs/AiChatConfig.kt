package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.DefaultRequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import org.springframework.stereotype.Component

@Component
class AiChatConfig : SinglePageApplicationConfig {
  override val routes: List<SinglePageApplicationRoute> = listOf(
    SinglePageApplicationRoute("", "AI_CHAT_INDEX"),
  )

  override val name: String = "AI Chat"
  override val urlPrefix: String = "ai_chat"
  override val appRootPath = "./src/main/web-frontend/apps/AiChat/AiChatRoot"
  override val requestHandler = DefaultRequestHandler()
}
