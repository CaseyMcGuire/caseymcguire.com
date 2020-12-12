package com.caseymcguiredotcom.controllers

import org.springframework.security.authentication.AnonymousAuthenticationToken
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
    "/posts/{id}",
    "/posts/page/{id}",
    "/posts/new",
    "/login",
    "/register"
  ])
  fun home(model: Model): String {
    val authentication = SecurityContextHolder.getContext().authentication
    model.addAttribute("isLoggedIn", authentication !is AnonymousAuthenticationToken)
    return "index"
  }
}