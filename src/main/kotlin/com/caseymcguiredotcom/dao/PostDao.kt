package com.caseymcguiredotcom.dao

import com.caseymcguiredotcom.models.Post
import generated.jooq.tables.Posts.Companion.POSTS
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class PostDao(val context: DSLContext) {

  fun getAll(): List<Post> {
    return context
      .select()
      .from(POSTS)
      .orderBy(POSTS.ID.desc())
      .fetch()
      .into(Post::class.java)
  }

  fun get(id: Int): Post? {
    return context
      .select()
      .from(POSTS)
      .where(POSTS.ID.eq(id))
      .fetchOne()
      ?.into(Post::class.java)
  }

  fun save(userId: Int, title: String, content: String): Post? {
    val id = context
      .insertInto(POSTS, POSTS.USER_ID, POSTS.TITLE, POSTS.CONTENTS)
      .values(userId, title, content)
      .returningResult(POSTS.ID)
      .fetchOne()
      ?.component1()
      ?: return null
    return get(id)
  }

  fun update(postId: Int, title: String, content: String): Post? {
    val id =
      context
        .update(POSTS)
        .set(POSTS.TITLE, title)
        .set(POSTS.CONTENTS, content)
        .where(POSTS.ID.eq(postId))
        .returningResult(POSTS.ID)
        .fetchOne()
        ?.component1()
        ?: return null
    return get(id)
  }

}