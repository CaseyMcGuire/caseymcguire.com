package com.caseymcguiredotcom.models

import com.expediagroup.graphql.annotations.GraphQLIgnore
import com.expediagroup.graphql.annotations.GraphQLName
import generated.jooq.tables.pojos.Users

@GraphQLIgnore
data class User(
  private val users: Users
) {

  fun getId(): Int = users.id!!

  fun getRole(): String? = users.role

  fun getPassWord(): String = users.password!!

  fun getEmail(): String = users.email!!

  @GraphQLName("is_admin")
  fun isAdmin(): Boolean {
    return getRole() == Role.ADMIN.name
  }
}