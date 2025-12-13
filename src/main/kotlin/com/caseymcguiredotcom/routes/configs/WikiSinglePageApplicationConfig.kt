package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.DefaultRequestHandler
import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SinglePageApplicationRoute
import org.springframework.stereotype.Component

@Component
class WikiSinglePageApplicationConfig : SinglePageApplicationConfig  {
  override val routes: List<SinglePageApplicationRoute> = listOf()
  override val name: String = "Wiki"
  override val urlPrefix: String = "wiki"
  override val appRootPath = "./src/main/web-frontend/projects/Wiki/WikiRoot.tsx"
  override val requestHandler = DefaultRequestHandler()
}