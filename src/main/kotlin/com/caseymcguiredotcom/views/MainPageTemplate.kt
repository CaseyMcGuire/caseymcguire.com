package com.caseymcguiredotcom.views

import kotlinx.html.*
import kotlinx.html.stream.createHTML

fun MainPageTemplate(): String {
  return createHTML().html {
    attributes["lang"] = "en"
    head {
      meta(charset = "UTF-8")
      title("Casey McGuire")

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
        href = "/assets/images/home_picture_2.jpeg"
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
      reactScripts()
      script {
        type = "text/javascript"
        src = "/assets/javascripts/highlight.min.js"
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
          )
        }
      }
      meta {
        name = "viewport"
        content = "initial-scale=1.0, maximum-scale=1.0, width=device-width"
      }
    }
    body {
      div {
        id = "root"
      }
      script {
        src = "/bundles/index.bundle.js"
      }
    }
  }
}
