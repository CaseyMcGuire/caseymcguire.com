package com.caseymcguiredotcom.views

import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.routes.configs.WikiSinglePageApplicationConfig
import kotlinx.html.link
import kotlinx.html.style
import kotlinx.html.unsafe

class WikiPage(private val config: SinglePageApplicationConfig) : RenderablePage {
  override fun render(): String {
    return ReactPage(config.bundleName, config.name)
      .importMapInputs(
        ImportMapInput("highlight.js", "https://esm.sh/highlight.js@11.11.1"),
        ImportMapInput("sanitize-html", "https://esm.sh/sanitize-html@2.13.0")
      )
      .customHead {
        link(
          rel = "stylesheet",
          href = "https://cdn.jsdelivr.net/npm/charter-webfont@4.1.0/charter.css"
        )
        style {
          unsafe {
            raw(
              """
                body {
                  font-family: "Charter", "Bitstream Charter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                               "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                               "Droid Sans", "Helvetica Neue", sans-serif;
                  
                }
                
                a, a:hover, a:visited, a:active {
                    color: inherit;
                }
              """.trimIndent()
            )
          }
        }
      }.render()
  }
}