package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
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

  fun requireLoggedInUser(): User =
    getLoggedInUser() ?: throw UserNotLoggedInException()

  fun requireAdmin(): User {
    val user = requireLoggedInUser()
    if (!user.isAdmin()) {
      throw PermissionDeniedException("Admin access required")
    }
    return user
  }
}
