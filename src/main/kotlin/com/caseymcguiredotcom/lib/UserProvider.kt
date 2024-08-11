package com.caseymcguiredotcom.lib

import models.User
import models.UserDetailsImpl
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component


@Component
class UserProvider {

  fun getLoggedInUser(): User? {
    val authentication = SecurityContextHolder.getContext().authentication
    if (authentication is AnonymousAuthenticationToken) {
      return null
    }
    return when (val principal = authentication.principal) {
      is UserDetailsImpl -> principal.user
      else -> null
    }
  }
}