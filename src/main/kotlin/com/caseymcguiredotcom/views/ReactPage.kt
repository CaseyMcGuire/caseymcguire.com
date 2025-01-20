package com.caseymcguiredotcom.views

import kotlinx.html.*
import kotlinx.html.stream.createHTML

class ReactPage(
  private val bundleName: String,
  private val pageTitle: String
) : RenderablePage {

  companion object {
    val REACT_INPUT = ImportMapInput("react", "https://esm.sh/react@18.3.1")
    val REACT_DOM_INPUT = ImportMapInput("react-dom", "https://esm.sh/react-dom@18.3.1")
  }

  private var customHead: (HEAD.() -> Unit)? = null
  private var customBody: (BODY.() -> Unit)? = null
  private var importMapInputs: List<ImportMapInput> = emptyList()

  fun customHead(block: HEAD.() -> Unit): ReactPage {
    customHead = block
    return this
  }

  fun importMapInputs(vararg inputs: ImportMapInput): ReactPage {
    importMapInputs = inputs.toList()
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
        script(type = "importmap") {
          unsafe {
            raw(
              """
            {
              "imports": {
                ${
                listOf(
                  REACT_INPUT,
                  REACT_DOM_INPUT,
                  *importMapInputs.toTypedArray()
                ).joinToString(",\n") { "\"${it.name}\" : \"${it.pathOrUrl}\"" }
                }
              }
            }
            """.trimIndent()
            )
          }
        }
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
          type = "module"
        }
        customBody?.invoke(this)
      }
    }
  }
}



data class ImportMapInput(val name: String, val pathOrUrl: String)