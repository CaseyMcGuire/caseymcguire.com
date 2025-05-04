package com.caseymcguiredotcom.db.entities

import jakarta.persistence.*

@Entity
@Table(
  name = "users", schema = "public", uniqueConstraints = [
    UniqueConstraint(name = "users_email_key", columnNames = ["email"])
  ]
)
open class User {
  @Id
  @Column(columnDefinition = "serial", name = "id", nullable = false)
  open var id: Int? = null

  @Column(columnDefinition = "varchar", name = "role", length = 45)
  open var role: String? = null

  @Column(columnDefinition = "varchar", name = "password", nullable = false, length = 60)
  open var password: String? = null

  @Column(columnDefinition = "text", name = "email", nullable = false, length = Integer.MAX_VALUE)
  open var email: String? = null
}