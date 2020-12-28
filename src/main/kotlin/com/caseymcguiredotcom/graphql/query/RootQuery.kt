package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLQuery
import com.caseymcguiredotcom.graphql.models.PostQuery
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

  fun posts(page: Int): List<PostQuery> = postService.getPosts().map { PostQuery(it) }

  fun post(id: Int): PostQuery? {
    val post = postService.getPostsById(id) ?: return null
    return PostQuery(post)
  }

  @GraphQLName("current_user")
  fun getCurrentUser(): User? = userService.getLoggedInUser()
}