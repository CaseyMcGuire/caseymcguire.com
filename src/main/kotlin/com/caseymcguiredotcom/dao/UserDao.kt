package com.caseymcguiredotcom.dao;

import models.User
import generated.jooq.tables.Users.Companion.USERS
import generated.jooq.tables.pojos.Users
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class UserDao(val context: DSLContext) {

  fun findByUsername(email: String): User? {
    val users = context
      .select()
      .from(USERS)
      .where(USERS.EMAIL.eq(email))
      .fetchOne()
      ?.into(Users::class.java) ?: return null
    return User(users)
  }

  fun save(email: String, hashedPassword: String) {
    context.insertInto(USERS, USERS.EMAIL, USERS.PASSWORD).values(email, hashedPassword).execute()
  }
}
