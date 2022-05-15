package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLQuery
import com.caseymcguiredotcom.graphql.models.*
import com.caseymcguiredotcom.services.PostService
import com.caseymcguiredotcom.services.UserService
import com.expediagroup.graphql.annotations.GraphQLName
import org.springframework.stereotype.Component

@Component
class RootQuery(
  val postService: PostService,
  val userService: UserService
) : GraphQLQuery {

  @GraphQLName("posts")
  fun posts(count: Int, offset: Int): PostPage {
    // we get one more to determine if we should paginate
    val posts = postService.getPostsAfter(count + 1, offset).map { GraphqlPost(it) }
    val displayedPosts = if (posts.size == count + 1) posts.dropLast(1) else posts
    return PostPage(displayedPosts, posts.size == count + 1, offset != 0)
  }

  fun post(id: Int): GraphqlPost? {
    val post = postService.getPostsById(id) ?: return null
    return GraphqlPost(post)
  }

  @GraphQLName("current_user")
  fun getCurrentUser(): GraphqlUser? {
    val loggedInUser = userService.getLoggedInUser() ?: return null
    return GraphqlUser(loggedInUser)
  }
}
