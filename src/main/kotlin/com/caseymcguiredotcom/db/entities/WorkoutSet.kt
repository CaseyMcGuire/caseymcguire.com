package com.caseymcguiredotcom.db.entities

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "workout_set", schema = "public")
open class WorkoutSet {
  @Id
  @Column(columnDefinition = "serial", name = "id", nullable = false)
  open var id: Int? = null

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "workout_id", nullable = false)
  open var workout: Workout? = null

  @Column(columnDefinition = "text", name = "description", length = Integer.MAX_VALUE)
  open var description: String? = null

  @Column(columnDefinition = "text", name = "exercise_type", nullable = false, length = Integer.MAX_VALUE)
  open var exerciseType: String? = null

  @Column(columnDefinition = "integer", name = "num_reps", nullable = false)
  open var numReps: Int? = null

  @Column(columnDefinition = "integer", name = "weight", nullable = false)
  open var weight: Int? = null

  @Column(columnDefinition = "varchar", name = "unit_of_mass", nullable = false, length = 50)
  open var unitOfMass: String? = null

  @Column(columnDefinition = "timestamp", name = "created_at", nullable = false)
  open var createdAt: Instant? = null

  @Column(columnDefinition = "timestamp", name = "updated_at", nullable = false)
  open var updatedAt: Instant? = null

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "exercise_id")
  open var exercise: Exercise? = null
}