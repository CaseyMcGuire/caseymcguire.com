package com.caseymcguiredotcom.db.entities

import jakarta.persistence.*

@Entity
@Table(name = "exercise", schema = "public")
class Exercise {
  @Id
  @Column(columnDefinition = "serial", name = "id", nullable = false)
  var id: Int? = null

  @Column(columnDefinition = "text", name = "name", nullable = false)
  var name: String? = null
}