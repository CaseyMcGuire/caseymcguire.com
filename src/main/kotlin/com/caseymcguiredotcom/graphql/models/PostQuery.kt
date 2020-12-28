package com.caseymcguiredotcom.graphql.models

import com.caseymcguiredotcom.models.Post
import com.expediagroup.graphql.annotations.GraphQLName
import java.text.SimpleDateFormat

@GraphQLName("Post")
class PostQuery(private val post: Post) {

  @GraphQLName("id")
  fun getId(): Int = post.id

  @GraphQLName("title")
  fun getTitle(): String = post.title

  @GraphQLName("contents")
  fun contents(): String = post.contents

  @GraphQLName("published_date")
  fun getPublishedDate(): String {
    val date = SimpleDateFormat("yyyy-MM-dd").parse(post.publishedDate)
    return SimpleDateFormat("MMMM dd, yyyy").format(date)
  }
}