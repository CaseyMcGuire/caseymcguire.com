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


  fun savePost(id: Int?, title: String, content: String): Post? {
    val user = userService.getLoggedInUser() ?: return null
    if (!user.isAdmin()) {
      return null
    }
    return if (id != null) {
      if (postDao.get(id) == null) {
        return null
      }
      postDao.update(id, title, content)
    } else {
      postDao.save(user.getId(), title, content)
    }
  }

}