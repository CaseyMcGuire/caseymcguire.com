package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLQuery
import com.caseymcguiredotcom.models.Post
import com.caseymcguiredotcom.models.User
import com.caseymcguiredotcom.services.PostService
import com.caseymcguiredotcom.services.UserService
import com.expediagroup.graphql.annotations.GraphQLName
import org.springframework.stereotype.Component

@Component
class RootQuery(
  val postService: PostService,
  val userService: UserService
) : GraphQLQuery {
  companion object {
    const val POSTS_PER_PAGE = 5
  }

  fun posts(page: Int): List<Post> {
    return postService.getPosts()
  }

  fun post(id: Int): Post? = postService.getPostsById(id)

  @GraphQLName("current_user")
  fun getCurrentUser(): User? = userService.getLoggedInUser()
}