package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLMutation
import com.caseymcguiredotcom.services.PostService
import com.caseymcguiredotcom.services.UserService
import com.expediagroup.graphql.annotations.GraphQLName
import org.springframework.stereotype.Component

@Component
class RootMutation(
  val userService: UserService,
  val postService: PostService
) : GraphQLMutation {

  fun register(email: String, password: String): Boolean {
    userService.registerUser(email, password)
    return true
  }

  @GraphQLName("create_or_edit_post")
  fun createOrEditPost(id: Int?, title: String, content: String): Int? {
    val post = postService.savePost(id, title, content)
    return post?.id
  }
}