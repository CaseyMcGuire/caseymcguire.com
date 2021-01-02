package com.caseymcguiredotcom.controllers

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
open class AppErrorController : ErrorController {
  override fun getErrorPath(): String {
    return "/error"
  }

  @RequestMapping("/error")
  fun error(): String {
    return "index"
  }
}
