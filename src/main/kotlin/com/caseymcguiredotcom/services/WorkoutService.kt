package com.caseymcguiredotcom.services

import com.caseymcguiredotcom.dao.ExerciseType
import com.caseymcguiredotcom.dao.WorkoutDao
import com.caseymcguiredotcom.lib.UserProvider
import com.caseymcguiredotcom.lib.exceptions.DuplicateEntityException
import com.caseymcguiredotcom.lib.exceptions.EntityNotFoundException
import com.caseymcguiredotcom.lib.exceptions.PermissionDeniedException
import com.caseymcguiredotcom.lib.exceptions.UserNotLoggedInException
import models.Exercise
import models.Workout
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Component

@Component
@PreAuthorize("hasRole('ADMIN')")
class WorkoutService(
  private val workoutDao: WorkoutDao,
  private val userProvider: UserProvider
) {

  fun getWorkouts(): List<Workout> {
    val userId = userProvider.getLoggedInUser()?.getId()
      ?: throw UserNotLoggedInException()
    return workoutDao.getWorkouts(userId, 0)
  }

  fun getWorkoutById(id: Int): Workout? {
    val userId = userProvider.getLoggedInUser()?.getId()
      ?: throw UserNotLoggedInException()


    val workout = workoutDao.getWorkout(id) ?: return null
    if (workout.userId != userId) {
      throw PermissionDeniedException()
    }
    return workout
  }

  fun createWorkout(description: String?): Workout? {
    val userId = userProvider.getLoggedInUser()?.getId()
      ?: throw UserNotLoggedInException()
    val workoutId = workoutDao.createWorkout(userId, description)
      ?: return null
    return workoutDao.getWorkout(workoutId)
  }

  fun addSet(
    workoutId: Int,
    exerciseId: Int,
    description: String,
    numReps: Int,
    weight: Int
  ): Workout {
    val userId = userProvider.getLoggedInUser()?.getId()
      ?: throw UserNotLoggedInException()
    val workout = workoutDao.getWorkout(workoutId)
      ?: throw EntityNotFoundException("No workout with id: $workoutId")
    workoutDao.getExerciseById(exerciseId)
      ?: throw EntityNotFoundException("No exercise with id: $exerciseId")

    if (workout.userId != userId) {
      throw PermissionDeniedException()
    }

    workoutDao.insertWorkoutSet(
      workoutId,
      exerciseId,
      description,
      numReps,
      weight
    )

    return workoutDao.getWorkout(workoutId)
      ?: throw EntityNotFoundException()
  }

  fun createExercise(name: String): Int {
    userProvider.getLoggedInUser()
      ?: throw UserNotLoggedInException()
    val existingExercise = workoutDao.getExerciseByName(name)
    if (existingExercise != null) {
      throw DuplicateEntityException("An exercise with name $name already exists")
    }
    return workoutDao.createExercise(name)
      ?: throw EntityNotFoundException()
  }

  fun getExerciseById(id: Int): Exercise? {
    return workoutDao.getExerciseById(id)
  }

  fun getExerciseByName(name: String): Exercise? {
    return workoutDao.getExerciseByName(name)
  }

  fun getExercises(): List<Exercise> {
    return workoutDao.getAllExercises()
  }

}