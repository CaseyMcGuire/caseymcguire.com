package com.caseymcguiredotcom.graphql.query

import com.caseymcguiredotcom.graphql.config.GraphQLQuery
import com.caseymcguiredotcom.services.PostService
import org.springframework.stereotype.Component

@Component
class RootQuery(val postService: PostService) : GraphQLQuery {
  companion object {
    const val POSTS_PER_PAGE = 5
  }

  val posts = listOf(Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"),
    Post(id = "1", title = "Title", content = "content"))

  fun posts(page: Int): List<Post> {
    return posts
  }

  fun post(id: String): Post = Post(
    id = id,
    title = "Title",
    content = "Content"
  )
}