package com.caseymcguiredotcom.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {

  @GetMapping(value = [
    "/",
    "/resume",
    "/posts",
    "/posts/page/{id}",
    "/login",
    "/register"
  ])
  fun home(): String {
    return "index"
  }
}