package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.codegen.graphql.types.Movie
import com.caseymcguiredotcom.codegen.graphql.types.Post
import com.caseymcguiredotcom.codegen.graphql.types.PostPage
import com.caseymcguiredotcom.codegen.graphql.types.User
import com.caseymcguiredotcom.models.Role
import com.caseymcguiredotcom.services.PostService
import com.caseymcguiredotcom.services.UserService
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery

@DgsComponent
class QueryDataFetcher(
  val userService: UserService,
  val postService: PostService
) {

  @DgsQuery(field = "currentUser")
  fun getCurrentUser(): User? {
    val loggedInUser = userService.getLoggedInUser() ?: return null
    return User(loggedInUser.getEmail(), loggedInUser.getId(), loggedInUser.getRole() == Role.ADMIN.name)
  }

  @DgsQuery(field = "post")
  fun getPost(id: Int): Post? {
    val post = postService.getPostsById(id) ?: return null
    return Post(
      id = post.getId(),
      contents = post.getContents(),
      published_date = post.getPublishedDate().toString(),
      title = post.getTitle()
    )
  }

  @DgsQuery(field = "posts")
  fun getPosts(count: Int, offset: Int): PostPage? {
    // we get one more to determine if we should paginate
    val posts = postService.getPostsAfter(count + 1, offset).map {
      Post(
        id = it.getId(),
        contents = it.getContents(),
        published_date = it.getPublishedDate().toString(),
        title = it.getTitle()
      )
    }
    val displayedPosts = if (posts.size == count + 1) posts.dropLast(1) else posts
    return PostPage(posts = displayedPosts, hasNextPage = posts.size == count + 1, hasPreviousPage = offset != 0)
  }

  @DgsMutation(field = "createOrEditPost")
  fun createOrEditPost(id: Int?, title: String, content: String): Int? {
    val post = postService.savePost(id, title, content)
    return post?.getId()
  }

  @DgsMutation
  fun register(email: String, password: String): Boolean {
    userService.registerUser(email, password)
    return true
  }
}