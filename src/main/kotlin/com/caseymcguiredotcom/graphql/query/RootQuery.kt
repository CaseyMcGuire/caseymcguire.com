package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLQuery
import com.caseymcguiredotcom.services.PostService
import org.springframework.stereotype.Component

@Component
class RootQuery(val postService: PostService) : GraphQLQuery {
  companion object {
    const val POSTS_PER_PAGE = 5
  }

  fun posts(page: Int): List<Post> {
    return postService.getPosts()
  }

  fun post(id: Int): Post? = postService.getPostsById(id)
}