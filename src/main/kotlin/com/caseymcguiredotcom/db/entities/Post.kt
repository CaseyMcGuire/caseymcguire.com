package com.caseymcguiredotcom.db.entities

import jakarta.persistence.*
import org.hibernate.annotations.ColumnDefault
import java.time.LocalDate

@Entity
@Table(name = "posts", schema = "public")
class Post {
  @Id
  @Column(columnDefinition = "serial", name = "id", nullable = false)
  var id: Int? = null

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  var user: User? = null

  @Column(columnDefinition = "text", name = "title")
  var title: String? = null

  @Column(columnDefinition = "text", name = "contents")
  var contents: String? = null

  @ColumnDefault("CURRENT_DATE")
  @Column(columnDefinition = "date", name = "published_date", nullable = false)
  var publishedDate: LocalDate? = null
}