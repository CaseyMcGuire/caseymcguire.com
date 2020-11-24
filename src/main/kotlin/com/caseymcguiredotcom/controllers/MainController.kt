package com.caseymcguiredotcom.controllers

import generated.jooq.tables.references.POSTS
import org.jooq.DSLContext
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController(val context: DSLContext) {

  @GetMapping(value = [
    "/",
    "/resume",
    "/posts",
    "/posts/page/{id}"
  ])
  fun home(): String {
    val result = context.select().from(POSTS).fetch()
    println(result)
    return "index"
  }
}