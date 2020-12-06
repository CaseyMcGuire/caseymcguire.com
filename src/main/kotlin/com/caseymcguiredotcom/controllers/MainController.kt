package com.caseymcguiredotcom.controllers

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
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
  fun home(model: Model): String {
    val authentication = SecurityContextHolder.getContext().authentication
    model.addAttribute("isLoggedIn", authentication.isAuthenticated)
    return "index"
  }
}