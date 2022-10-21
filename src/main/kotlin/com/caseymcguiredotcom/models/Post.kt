package com.caseymcguiredotcom.models

import generated.jooq.tables.pojos.Posts
import java.time.LocalDate

data class Post(
  private val posts: Posts
) {
  fun getId(): Int = posts.id!!

  fun getTitle(): String = posts.title!!

  fun getContents(): String = posts.contents!!

  fun getPublishedDate(): LocalDate =  posts.publishedDate!!
}