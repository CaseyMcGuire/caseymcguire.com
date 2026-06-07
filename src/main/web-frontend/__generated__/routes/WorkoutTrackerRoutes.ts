// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

function routeWithoutParams(path: string) {
  return Object.assign(() => path, { path });
}

type RouteParamValue = string | number;

function encodeRouteParam(value: RouteParamValue): string {
  return encodeURIComponent(String(value));
}

function route<TParams extends object>(path: string, buildPath: (params: TParams) => string) {
  return Object.assign(buildPath, { path });
}

export const WorkoutTrackerRoutes = {
  CreateExercise: routeWithoutParams("/workout_tracker/exercise/create"),
  CreateWorkout: routeWithoutParams("/workout_tracker/workout/create"),
  ExerciseIndex: routeWithoutParams("/workout_tracker/exercise"),
  UpdateWorkout: route(
    "/workout_tracker/workout/:id/update",
    (params: { id: number }) => `/workout_tracker/workout/${encodeRouteParam(params.id)}/update`
  ),
  ViewWorkout: route(
    "/workout_tracker/workout/:id",
    (params: { id: number }) => `/workout_tracker/workout/${encodeRouteParam(params.id)}`
  ),
  ViewWorkouts: routeWithoutParams("/workout_tracker/workout"),
  WorkoutHistory: routeWithoutParams("/workout_tracker/workout/history"),
  WorkoutIndex: routeWithoutParams("/workout_tracker"),
} as const;

export type WorkoutTrackerRoute = keyof typeof WorkoutTrackerRoutes;
