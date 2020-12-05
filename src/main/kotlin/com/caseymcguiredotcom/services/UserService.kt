package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.generated.jooq.tables.references.USERS
import org.jooq.DSLContext
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(val context: DSLContext, val passwordEncoder: PasswordEncoder) {

  fun registerUser(email: String, password: String) {
    val hashedPassword = passwordEncoder.encode(password)
    context.insertInto(USERS, USERS.EMAIL, USERS.PASSWORD).values(email, hashedPassword).execute()
  }
}