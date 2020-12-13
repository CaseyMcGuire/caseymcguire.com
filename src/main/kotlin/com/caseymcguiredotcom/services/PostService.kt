package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.PostDao
import com.caseymcguiredotcom.graphql.query.Post

import org.springframework.stereotype.Service

@Service
class PostService(
  val userService: UserService,
  val postDao: PostDao
) {

  fun getPosts(): List<Post> {
    return postDao.getAll()
  }

  fun getPostsById(id: Int): Post? = postDao.get(id)


  fun savePost(title: String, content: String): Post? {
    val user = userService.getLoggedInUser() ?: return null

    return postDao.save(user.getId(), title, content)
  }

}