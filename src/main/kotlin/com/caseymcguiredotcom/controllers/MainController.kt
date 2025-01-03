package com.caseymcguiredotcom.controllers

import com.caseymcguiredotcom.views.BasePage
import com.caseymcguiredotcom.views.MainPageTemplate
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class MainController {

  @GetMapping(
    value = [
      "/",
      "/resume",
      "/posts",
      "/posts/{id}",
      "/posts/page/{id}",
      "/posts/new",
      "/login",
      "/register",
      "/tetris"
    ]
  )
  @ResponseBody
  fun home(): String {
    return MainPageTemplate()
  }

  @GetMapping(
    value = [
      "/movies",
      "/tv"
    ]
  )
  fun movies(): String {
    return "movie"
  }

  @GetMapping("/graphiql")
  fun graphiql(): String {
    return "graphiql"
  }
}