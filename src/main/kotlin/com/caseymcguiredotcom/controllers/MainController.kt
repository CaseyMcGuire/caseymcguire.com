package com.caseymcguiredotcom.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {

  @GetMapping(value = [
    "/",
    "/resume",
    "/posts",
    "/posts/{id}",
    "/posts/page/{id}",
    "/posts/new",
    "/login",
    "/register",
    "/tetris"
  ])

  fun home(): String {
    return "index"
  }
}