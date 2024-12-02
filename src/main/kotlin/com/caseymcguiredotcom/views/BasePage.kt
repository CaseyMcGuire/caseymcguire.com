package com.caseymcguiredotcom.views

import kotlinx.html.*
import kotlinx.html.stream.createHTML

fun BasePage(bundleName: String): String =
  createHTML().html {
    head {
      meta(charset = "UTF-8")
      title {
        +"Casey McGuire"
      }
      reactScripts()
      style {
        unsafe {
          +"""
                    body {
                        /* Taken from: https://furbo.org/2018/03/28/system-fonts-in-css/ */
                        font-family: "Computer Modern Serif", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                        "Droid Sans", "Helvetica Neue", sans-serif;
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        color: #2f2f2f;
                    }

                    html, body, #root {
                        height: 100%;
                    }
            """.trimIndent()
        }
      }
    }
    body {
      div {
        attributes["id"] = "root"
      }
      script(src = "/bundles/${bundleName}.bundle.js") {}
    }
  }

fun HEAD.reactScripts() {
  script(type = "text/javascript", src = "/assets/javascripts/react.production.min.js") {}
  script(type = "text/javascript", src = "/assets/javascripts/react-dom.production.min.js") {}
}
