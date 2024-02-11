package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.UserDao
import models.User
import models.UserDetailsImpl
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
  val userDao: UserDao,
  val passwordEncoder: PasswordEncoder
) {

  fun getUserByUsername(email: String): User? {
    return userDao.findByUsername(email)
  }

  fun registerUser(email: String, password: String) {
    val hashedPassword = passwordEncoder.encode(password)
    userDao.save(email, hashedPassword)
  }

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