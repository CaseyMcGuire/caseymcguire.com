package com.caseymcguiredotcom.graphql.query

import javax.persistence.Column

data class Post(
  @Column(name = "id")
  val id: String,

  @Column(name = "title")
  val title: String,

  @Column(name = "content")
  val content: String
)