package com.caseymcguiredotcom.models

import com.expediagroup.graphql.annotations.GraphQLName
import javax.persistence.Column

data class Post(
  @Column(name = "id")
  val id: Int,

  @Column(name = "title")
  val title: String,

  @Column(name = "contents")
  val contents: String,

  @GraphQLName("published_date")
  @Column(name = "published_date")
  val publishedDate: String
)