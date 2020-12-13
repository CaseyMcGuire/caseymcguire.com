package com.caseymcguiredotcom.models

import javax.persistence.Column

data class User(
  @Column(name = "id")
  val id: Int,

  @Column(name = "email")
  val email: String,

  @Column(name = "password")
  val password: String,

  @Column(name = "role")
  val role: String?
)