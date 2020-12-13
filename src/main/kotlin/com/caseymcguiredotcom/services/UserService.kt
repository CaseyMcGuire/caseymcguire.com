package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.UserDao
import com.caseymcguiredotcom.models.User
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
    return authentication.principal as User
  }
}