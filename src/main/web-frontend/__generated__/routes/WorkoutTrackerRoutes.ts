// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Generated from SinglePageApplicationConfig beans.

export const WorkoutTrackerRoutes = {
  WORKOUT_INDEX: "/workout_tracker",
  VIEW_WORKOUTS: "/workout_tracker/workout",
  VIEW_WORKOUT: "/workout_tracker/workout/:id",
  CREATE_WORKOUT: "/workout_tracker/workout/create",
  UPDATE_WORKOUT: "/workout_tracker/workout/:id/update",
  EXERCISE_INDEX: "/workout_tracker/exercise",
  CREATE_EXERCISE: "/workout_tracker/exercise/create",
  WORKOUT_HISTORY: "/workout_tracker/workout/history",
} as const;

export type WorkoutTrackerRoute = keyof typeof WorkoutTrackerRoutes;
