package com.caseymcguiredotcom.views

import kotlinx.html.*
import kotlinx.html.stream.createHTML

class ReactPage(
  private val bundleName: String,
  private val pageTitle: String
) : RenderablePage {

  private var customHead: (HEAD.() -> Unit)? = null
  private var customBody: (BODY.() -> Unit)? = null
  fun customHead(block: HEAD.() -> Unit): ReactPage {
    customHead = block
    return this
  }

  fun customBody(block: BODY.() -> Unit): ReactPage {
    customBody = block
    return this
  }

  override fun render(): String {
    return createHTML().html {
      head {
        meta(charset = "UTF-8")
        title {
          +pageTitle
        }
        meta {
          name = "viewport"
          content = "initial-scale=1.0, maximum-scale=1.0, width=device-width"
        }
        link {
          rel = "stylesheet"
          href = "/bundles/styles.css"
        }
        reactScripts()
        style {
          unsafe {
            +"""

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    html, body, #root {
                        height: 100%;
                    }
            """.trimIndent()
          }
        }
        customHead?.invoke(this)
      }
      body {
        div {
          attributes["id"] = "root"
        }
        script {
          src = "/bundles/${bundleName}.bundle.js"
        }
        customBody?.invoke(this)
      }
    }
  }

}