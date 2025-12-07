package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.repositories.PostRepository
import models.Post

import org.springframework.stereotype.Service

@Service
class PostService(
  private val userService: UserService,
  private val postRepository: PostRepository
) {

  fun getPosts(): List<Post> {
    return postRepository.getAll()
  }

  fun getPostsAfter(count: Int, offset: Int): List<Post> {
    return postRepository.getAfter(count, offset)
  }

  fun getPostsById(id: Int): Post? = postRepository.get(id)


  fun savePost(id: Int?, title: String, content: String): Post? {
    val user = userService.getLoggedInUser() ?: return null
    if (!user.isAdmin()) {
      return null
    }
    return if (id != null) {
      if (postRepository.get(id) == null) {
        return null
      }
      postRepository.update(id, title, content)
    } else {
      postRepository.save(user.getId(), title, content)
    }
  }

}