package com.caseymcguiredotcom.services

import models.User
import models.UserDetailsImpl
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class SessionService {
  fun getLoggedInUser(): User? {
    val authentication = SecurityContextHolder.getContext().authentication
    if (authentication == null || authentication is AnonymousAuthenticationToken) {
      return null
    }
    return when (val principal = authentication.principal) {
      is UserDetailsImpl -> principal.user
      else -> null
    }
  }
}