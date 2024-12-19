package com.caseymcguiredotcom.views

import kotlinx.html.HEAD
import kotlinx.html.script

fun HEAD.reactScripts() {
  script(type = "text/javascript", src = "/assets/javascripts/react.production.min.js") {}
  script(type = "text/javascript", src = "/assets/javascripts/react-dom.production.min.js") {}
}