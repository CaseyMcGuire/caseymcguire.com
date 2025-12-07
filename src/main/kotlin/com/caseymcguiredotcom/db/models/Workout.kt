package models

import com.caseymcguiredotcom.repositories.ExerciseType
import generated.jooq.tables.pojos.ExerciseTableRow
import generated.jooq.tables.pojos.WorkoutTableRow
import generated.jooq.tables.pojos.WorkoutSetTableRow

class Workout(
  private val workout: WorkoutTableRow,
  private val workoutSets: List<WorkoutSetTableRow>,
  private val exercises: List<ExerciseTableRow>
) {
  val id: Int = workout.id!!
  val userId: Int = workout.userId!!
  val description: String? = workout.description
  val sets: List<WorkoutSet> by lazy {
    val exerciseIdToExercise = exercises.map {
      Exercise(
        id = it.id!!,
        name = it.name!!
      )
    }.associateBy { it.id }
    workoutSets
      .map {
        WorkoutSet(
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