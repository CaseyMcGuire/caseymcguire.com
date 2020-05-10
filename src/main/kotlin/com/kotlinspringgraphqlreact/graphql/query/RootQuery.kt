package com.kotlinspringgraphqlreact.graphql.query

import com.kotlinspringgraphqlreact.graphql.config.GraphQLQuery
import org.springframework.stereotype.Component

@Component
class RootQuery : GraphQLQuery {
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
    Post(id = "1", title = "Title", content = "content"))

  fun posts(page: Int): List<Post> = posts.subList(page * POSTS_PER_PAGE, page * POSTS_PER_PAGE + POSTS_PER_PAGE)

  fun post(id: String): Post = Post(
    id = id,
    title = "Title",
    content = "Content"
  )
}