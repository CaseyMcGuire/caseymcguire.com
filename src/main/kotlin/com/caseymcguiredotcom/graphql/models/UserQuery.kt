package com.caseymcguiredotcom.graphql.models

import com.caseymcguiredotcom.models.User
import com.expediagroup.graphql.annotations.GraphQLName

@GraphQLName("User")
class UserQuery(private val user: User) {

  @GraphQLName("email")
  fun getEmail(): String {
    return user.getEmail()
  }

  @GraphQLName("id")
  fun getId(): Int {
    return user.getId()
  }

  @GraphQLName("is_admin")
  fun isAdmin(): Boolean {
    return user.isAdmin()
  }

}