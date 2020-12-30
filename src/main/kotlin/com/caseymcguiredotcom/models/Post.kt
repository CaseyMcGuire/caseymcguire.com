package com.caseymcguiredotcom.models

import com.expediagroup.graphql.annotations.GraphQLIgnore
import generated.jooq.tables.pojos.Posts
import java.time.LocalDate

@GraphQLIgnore
data class Post(
  private val posts: Posts
) {
  fun getId(): Int = posts.id!!

  fun getTitle(): String = posts.title!!

  fun getContents(): String = posts.contents!!

  fun getPublishedDate(): LocalDate =  posts.publishedDate!!
}