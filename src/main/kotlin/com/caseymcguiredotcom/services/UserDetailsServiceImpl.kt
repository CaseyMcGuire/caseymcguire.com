package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.generated.jooq.tables.Users.Companion.USERS
import com.caseymcguiredotcom.models.User
import org.jooq.DSLContext
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(val context: DSLContext): UserDetailsService {

  @Throws(UsernameNotFoundException::class)
  override fun loadUserByUsername(email: String?): UserDetails {
    val result = context
      .select()
      .from(USERS)
      .fetchOne()
      ?: throw UsernameNotFoundException("user with given email not found")

    return result
      .map {
        User(
          email = it[USERS.EMAIL]!!,
          password = it[USERS.PASSWORD]!!,
          role = it[USERS.ROLE]!!
        )
      }
  }

}