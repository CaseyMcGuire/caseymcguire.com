package com.caseymcguiredotcom.routes

import com.caseymcguiredotcom.views.ReactPage
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

class DefaultRequestHandler : RequestHandler {
  override fun handle(request: ServerRequest, config: SinglePageApplicationConfig): ServerResponse {
    return ServerResponse.ok()
      .contentType(MediaType.TEXT_HTML)
      .body(
        ReactPage(config.bundleName, config.name)
          .render()
      )
  }
}