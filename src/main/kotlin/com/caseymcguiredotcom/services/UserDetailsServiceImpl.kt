package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.UserDao
import models.UserDetailsImpl
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(val userDao: UserDao): UserDetailsService {

  @Throws(UsernameNotFoundException::class)
  override fun loadUserByUsername(email: String?): UserDetails {
    val exception = UsernameNotFoundException("User with given email not found")
    if (email == null) {
      throw exception
    }
    val user = userDao.findByUsername(email)
    if (user != null) {
      return UserDetailsImpl(user)
    }
    throw exception
  }

}