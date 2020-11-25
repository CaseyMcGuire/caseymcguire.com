package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.db.generated.jooq.tables.Posts
import com.caseymcguiredotcom.graphql.query.Post

import org.jooq.DSLContext
import org.springframework.stereotype.Service

@Service
class PostService(val context: DSLContext) {
  companion object {
    val POSTS = Posts.POSTS
  }

  fun getPosts(): List<Post> {
    return context
      .select()
      .from(POSTS)
      .fetch()
      .map {
        Post(
          id = it[POSTS.ID].toString(),
          title = it[POSTS.TITLE]!!,
          content = it[POSTS.CONTENTS]!!
        )
      }


  }

}