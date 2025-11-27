package com.caseymcguiredotcom.controllers

import com.caseymcguiredotcom.views.BlogPage
import com.caseymcguiredotcom.views.ReactPage
import kotlinx.html.*
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class MainController {

  @GetMapping("/graphiql")
  @ResponseBody
  fun graphiql(): String {
    return ReactPage("graphiql", "GraphiQL").render()
  }
}