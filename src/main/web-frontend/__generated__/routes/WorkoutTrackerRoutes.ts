// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

export const WorkoutTrackerRoutes = {
  CreateExercise: "/workout_tracker/exercise/create",
  CreateWorkout: "/workout_tracker/workout/create",
  ExerciseIndex: "/workout_tracker/exercise",
  UpdateWorkout: "/workout_tracker/workout/:id/update",
  ViewWorkout: "/workout_tracker/workout/:id",
  ViewWorkouts: "/workout_tracker/workout",
  WorkoutHistory: "/workout_tracker/workout/history",
  WorkoutIndex: "/workout_tracker",
} as const;

export type WorkoutTrackerRoute = keyof typeof WorkoutTrackerRoutes;
