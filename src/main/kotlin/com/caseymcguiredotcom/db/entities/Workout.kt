package com.caseymcguiredotcom.db.entities

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "workout", schema = "public")
open class Workout {

  @Id
  @Column(columnDefinition = "serial", name = "id", nullable = false)
  open var id: Int? = null

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  open var user: User? = null

  @Column(columnDefinition = "text", name = "description", length = Integer.MAX_VALUE)
  open var description: String? = null

  @Column(columnDefinition = "timestamp", name = "created_at", nullable = false)
  open var createdAt: Instant? = null

  @Column(columnDefinition = "timestamp", name = "updated_at", nullable = false)
  open var updatedAt: Instant? = null
}