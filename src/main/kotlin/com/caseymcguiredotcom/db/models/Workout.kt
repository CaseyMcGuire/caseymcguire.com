package models

import com.caseymcguiredotcom.dao.ExerciseType
import generated.jooq.tables.pojos.Workout
import generated.jooq.tables.pojos.WorkoutSet

class Workout(
  private val workout: Workout,
  private val workoutSets: List<WorkoutSet>
) {
  val id: Int = workout.id!!
  val userId: Int = workout.userId!!
  val description: String? = workout.description
  val sets: List<models.WorkoutSet> = workoutSets
    .map { models.WorkoutSet(
      id = it.id!!,
      numReps = it.numReps!!,
      weight = it.weight!!,
      exerciseType = ExerciseType.valueOf(it.exerciseType!!)
    )
    }
}

data class WorkoutSet(
  val id: Int,
  val numReps: Int,
  val weight: Int,
  val exerciseType: ExerciseType
)