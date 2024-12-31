package models

import generated.jooq.tables.pojos.PostsTableRow
import java.time.LocalDate

data class Post(
  private val posts: PostsTableRow
) {
  fun getId(): Int = posts.id!!

  fun getTitle(): String = posts.title!!

  fun getContents(): String = posts.contents!!

  fun getPublishedDate(): LocalDate =  posts.publishedDate!!
}