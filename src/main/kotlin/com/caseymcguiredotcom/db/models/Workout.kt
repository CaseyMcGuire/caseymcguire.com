package models

import com.caseymcguiredotcom.dao.ExerciseType
import generated.jooq.tables.pojos.Workout
import generated.jooq.tables.pojos.WorkoutSet

class Workout(
  private val workout: Workout,
  private val workoutSets: List<WorkoutSet>,
  private val exercises: List<generated.jooq.tables.pojos.Exercise>
) {
  val id: Int = workout.id!!
  val userId: Int = workout.userId!!
  val description: String? = workout.description
  val sets: List<models.WorkoutSet> by lazy {
    val exerciseIdToExercise = exercises.map {
      models.Exercise(
        id = it.id!!,
        name = it.name!!
      )
    }.associateBy { it.id }
    workoutSets
      .map {
        models.WorkoutSet(
        id = it.id!!,
        numReps = it.numReps!!,
        weight = it.weight!!,
        exerciseType = ExerciseType.valueOf(it.exerciseType!!),
        exercise = exerciseIdToExercise[it.exerciseId]!!
        )
      }
  }
}

data class WorkoutSet(
  val id: Int,
  val numReps: Int,
  val weight: Int,
  val exerciseType: ExerciseType,
  val exercise: Exercise
)

data class Exercise(
  val id: Int,
  val name: String
)