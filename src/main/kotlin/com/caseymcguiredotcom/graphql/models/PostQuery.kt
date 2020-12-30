package com.caseymcguiredotcom.graphql.models

import com.caseymcguiredotcom.models.Post
import com.expediagroup.graphql.annotations.GraphQLName
import java.time.format.DateTimeFormatter

@GraphQLName("Post")
class PostQuery(private val post: Post) {

  @GraphQLName("id")
  fun getId(): Int = post.getId()

  @GraphQLName("title")
  fun getTitle(): String = post.getTitle()

  @GraphQLName("contents")
  fun contents(): String = post.getContents()

  @GraphQLName("published_date")
  fun getPublishedDate(): String {
    return post.getPublishedDate()
      .format(DateTimeFormatter.ofPattern("MMMM dd, yyyy"))
  }
}