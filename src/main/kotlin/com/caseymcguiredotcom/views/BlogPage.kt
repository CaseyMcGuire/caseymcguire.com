package com.caseymcguiredotcom.views

import kotlinx.html.*

class BlogPage : RenderablePage {

  override fun render(): String {
    return ReactPage("index", "Casey McGuire")
      .customHead {
        link {
          rel = "preload"
          href = "/assets/fonts/Computer_Modern/Serif/cmunrm.woff"
          attributes["as"] = "font"
          type = "font/woff"
          attributes["crossorigin"] = "anonymous"
        }
        link {
          rel = "preload"
          href = "/assets/fonts/Computer_Modern/Serif/cmunbx.woff"
          attributes["as"] = "font"
          type = "font/woff"
          attributes["crossorigin"] = "anonymous"
        }
        link {
          rel = "preload"
          href = "/assets/fonts/Computer_Modern/Serif/cmunti.woff"
          attributes["as"] = "font"
          type = "font/woff"
          attributes["crossorigin"] = "anonymous"
        }
        link {
          rel = "preload"
          href = "/assets/fonts/Computer_Modern/Serif/cmunbi.woff"
          attributes["as"] = "font"
          type = "font/woff"
          attributes["crossorigin"] = "anonymous"
        }
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
          href = "/bundles/styles.css"
        }
        link {
          rel = "stylesheet"
          href = "/assets/fonts/Computer_Modern/Serif/cmun-serif.css"
        }
        link {
          rel = "stylesheet"
          href = "https://fonts.googleapis.com/css2?family=Outfit"
        }
        link {
          rel = "stylesheet"
          href = "/assets/stylesheets/github.min.css"
        }
        script {
          type = "text/javascript"
          src = "/assets/javascripts/sanitize-html.min.js"
        }
        script {
          type = "text/javascript"
          src = "/assets/javascripts/highlight.min.js"
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
                  font-family: "Computer Modern Serif", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
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