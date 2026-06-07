package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.RequireAdmin
import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.SpaRouteRule
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.applications.WorkoutTrackerSpaApplication
import com.caseymcguiredotcom.views.ReactPage
import kotlinx.html.style
import kotlinx.html.unsafe
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.ServerResponse.ok

@Component
class WorkoutTrackerConfig(
  private val requireAdmin: RequireAdmin
) : SinglePageApplicationConfig {
  override val application: SpaApplicationDefinition = WorkoutTrackerSpaApplication
  override val rules: List<SpaRouteRule> = listOf(requireAdmin)

  override fun renderHtml(): ServerResponse =
    ok().contentType(MediaType.TEXT_HTML)
      .body(
        ReactPage(bundleName, name)
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
