package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.UserDao
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
    return userDao.findByUsername(email) ?: throw exception
  }

}