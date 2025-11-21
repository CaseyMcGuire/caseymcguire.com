package com.caseymcguiredotcom.routes

import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

interface RequestHandler {
  fun handle(request: ServerRequest): ServerResponse
}