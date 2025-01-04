package com.caseymcguiredotcom.views

import kotlinx.html.*
import kotlinx.html.stream.createHTML

class ReactPage(
  private val bundleName: String,
  private val pageTitle: String
) {

  fun render(): String {
    return createHTML().html {
      head {
        meta(charset = "UTF-8")
        title {
          +pageTitle
        }
        link {
          rel = "stylesheet"
          href = "/bundles/styles.css"
        }
        reactScripts()
        style {
          unsafe {
            +"""
                    body {
                        font-family: ui-sans-serif, system-ui, sans-serif, 
                                     Apple Color Emoji, Segoe UI Emoji, 
                                     Segoe UI Symbol, Noto Color Emoji;
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
        script {
          src = "/bundles/${bundleName}.bundle.js"
        }
      }
    }
  }

}