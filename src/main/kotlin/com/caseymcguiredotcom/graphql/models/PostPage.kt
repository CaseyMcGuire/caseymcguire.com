package com.caseymcguiredotcom.graphql.models

import com.expediagroup.graphql.annotations.GraphQLName

@GraphQLName("PostPage")
class PostPage(
  private val posts: List<GraphqlPost>,
  private val hasNextPage: Boolean,
  private val hasPreviousPage: Boolean
) {

  @GraphQLName("posts")
  fun getPosts(): List<GraphqlPost> = posts

  @GraphQLName("hasNextPage")
  fun hasNextPage(): Boolean = hasNextPage

  @GraphQLName("hasPreviousPage")
  fun hasPreviousPage(): Boolean = hasPreviousPage
}

