package com.caseymcguiredotcom.views

import kotlinx.html.*

class BlogPage : RenderablePage {

  override fun render(): String {
    return ReactPage("casey_mcguire", "Casey McGuire")
      .importMapInputs(
        ImportMapInput("highlight.js", "https://esm.sh/highlight.js@11.11.1"),
        ImportMapInput("sanitize-html", "https://esm.sh/sanitize-html@2.13.0")
      )
      .customHead {
        link(
          rel = "stylesheet",
          href = "https://cdn.jsdelivr.net/npm/charter-webfont@4.1.0/charter.css"
        )
        link {
          rel = "preload"
          attributes["as"] = "image"
          href = "/assets/images/home_picture.jpeg"
        }
        link {
          rel = "preload"
          attributes["as"] = "image"
          href = "/assets/images/home_picture_2.png"
        }
        link {
          rel = "preload"
          attributes["as"] = "image"
          href = "/assets/images/github_picture.png"
        }
        link {
          rel = "preload"
          attributes["as"] = "image"
          href = "/assets/images/linkedin_picture.png"
        }
        link {
          rel = "stylesheet"
          href = "https://fonts.googleapis.com/css2?family=Outfit"
        }
        link {
          rel = "stylesheet"
          href = "/assets/stylesheets/github.min.css"
        }
        meta {
          name = "viewport"
          content = "initial-scale=1.0, maximum-scale=1.0, width=device-width"
        }
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