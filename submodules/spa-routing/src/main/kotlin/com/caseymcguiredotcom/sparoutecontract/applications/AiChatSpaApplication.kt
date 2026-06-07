package com.caseymcguiredotcom.sparoutecontract.applications

import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.route
import com.caseymcguiredotcom.sparoutecontract.uuid

object AiChatSpaApplication : SpaApplicationDefinition {
  override val id = "ai_chat"
  override val name = "AI Chat"
  override val urlPrefix = "ai_chat"
  override val appRootPath = "./src/main/web-frontend/apps/AiChat/AiChatRoot"
  override val routes = listOf(
    route("", "AiChatIndex"),
    route("chat/{conversationId}", "ViewChat", parameters = listOf(uuid("conversationId")))
  )
}
