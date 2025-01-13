package com.caseymcguiredotcom.controllers

import com.caseymcguiredotcom.views.BlogPage
import com.caseymcguiredotcom.views.ReactPage
import kotlinx.html.*
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
    return BlogPage().render()
  }

  @GetMapping(
    value = [
      "/movies",
      "/tv"
    ]
  )
  @ResponseBody
  fun movies(): String {
    return ReactPage("movies", "Movies").render()
  }

  @GetMapping("/graphiql")
  @ResponseBody
  fun graphiql(): String {
    return ReactPage("graphiql", "GraphiQL").render()
  }
}