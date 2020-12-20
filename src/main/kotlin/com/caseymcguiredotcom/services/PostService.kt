package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.PostDao
import com.caseymcguiredotcom.models.Post

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
    if (!user.isAdmin()) {
      return null
    }

    return postDao.save(user.id, title, content)
  }

}