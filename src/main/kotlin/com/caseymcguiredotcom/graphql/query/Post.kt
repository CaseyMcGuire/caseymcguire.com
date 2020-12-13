package com.caseymcguiredotcom.graphql.query

import javax.persistence.Column

data class Post(
  @Column(name = "id")
  val id: Int,

  @Column(name = "title")
  val title: String,

  @Column(name = "contents")
  val contents: String
)