package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLMutation
import com.caseymcguiredotcom.services.UserService
import org.springframework.stereotype.Component

@Component
class RootMutation(val userService: UserService) : GraphQLMutation {

  fun register(email: String, password: String): Boolean {
    userService.registerUser(email, password)
    return true
  }
}