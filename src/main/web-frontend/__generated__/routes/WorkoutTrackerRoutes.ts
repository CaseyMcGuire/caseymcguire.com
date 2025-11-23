// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Generated from SinglePageApplicationConfig beans.

export const WorkoutTrackerRoutes = {
  CREATE_EXERCISE: "/workout_tracker/exercise/create",
  CREATE_WORKOUT: "/workout_tracker/workout/create",
  EXERCISE_INDEX: "/workout_tracker/exercise",
  UPDATE_WORKOUT: "/workout_tracker/workout/:id/update",
  VIEW_WORKOUT: "/workout_tracker/workout/:id",
  VIEW_WORKOUTS: "/workout_tracker/workout",
  WORKOUT_HISTORY: "/workout_tracker/workout/history",
  WORKOUT_INDEX: "/workout_tracker",
} as const;

export type WorkoutTrackerRoute = keyof typeof WorkoutTrackerRoutes;
