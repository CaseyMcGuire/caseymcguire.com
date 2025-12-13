package com.caseymcguiredotcom.handlers

import com.caseymcguiredotcom.routes.RequestHandler
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.views.ReactPage
import kotlinx.html.style
import kotlinx.html.unsafe
import org.springframework.http.MediaType
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.ServerResponse.ok


@Component
class WorkoutTrackerRequestHandler : RequestHandler {
  override fun handle(request: ServerRequest, config: SinglePageApplicationConfig): ServerResponse =
    ok().contentType(MediaType.TEXT_HTML)
      .body(
        ReactPage(config.bundleName, config.name)
          .customHead {
            style {
              unsafe {
                raw(
                  """
                    body {
                      font-family: ui-sans-serif, system-ui, sans-serif, 
                                   Apple Color Emoji, Segoe UI Emoji, 
                                   Segoe UI Symbol, Noto Color Emoji;
                                   

                    }
                    a, a:hover, a:visited, a:active {
                      color: #2f2f2f;
                    }
                  """.trimIndent()
                )
              }
            }
          }
          .render()
      )

}