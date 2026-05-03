package com.caseymcguiredotcom.controllers

import org.springframework.boot.webmvc.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
open class AppErrorController : ErrorController {

  @RequestMapping("/error")
  fun error(): String {
    return "index"
  }
}
