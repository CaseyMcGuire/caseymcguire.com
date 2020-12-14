package com.caseymcguiredotcom.models

import com.expediagroup.graphql.annotations.GraphQLIgnore
import javax.persistence.Column

data class User(
  @Column(name = "id")
  val id: Int,

  @Column(name = "email")
  val email: String,

  @GraphQLIgnore
  @Column(name = "password")
  val password: String,

  @Column(name = "role")
  val role: String?
)