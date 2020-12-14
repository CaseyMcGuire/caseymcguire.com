package com.caseymcguiredotcom.dao;

import com.caseymcguiredotcom.models.User
import generated.jooq.tables.Users.Companion.USERS
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class UserDao(val context: DSLContext) {

  fun findByUsername(email: String): User? {
    return context
      .select()
      .from(USERS)
      .where(USERS.EMAIL.eq(email))
      .fetchOne()
      ?.into(User::class.java)
  }

  fun save(email: String, hashedPassword: String) {
    context.insertInto(USERS, USERS.EMAIL, USERS.PASSWORD).values(email, hashedPassword).execute()

  }
}
