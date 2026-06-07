import {createBrowserRouter, RouterProvider} from "react-router";
import * as React from "react";
import {WorkoutTrackerHomePage} from "apps/WorkoutTracker/pages/WorkoutTrackerHomePage";
import WorkoutTrackerCreateWorkoutPage from "apps/WorkoutTracker/pages/WorkoutTrackerCreateWorkoutPage";
import WorkoutTrackerShowWorkoutPage from "apps/WorkoutTracker/pages/WorkoutTrackerShowWorkoutPage/WorkoutTrackerShowWorkoutPage";
import WorkoutTrackerExerciseIndexPage from "apps/WorkoutTracker/pages/WorkoutTrackerExercisesIndexPage";
import WorkoutTrackerCreateExercisePage from "apps/WorkoutTracker/pages/WorkoutTrackerCreateExercisePage";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import {WorkoutTrackerRoutes} from "__generated__/routes/WorkoutTrackerRoutes";

const router = createBrowserRouter([
  {
    path: WorkoutTrackerRoutes.WorkoutIndex,
    element: <WorkoutTrackerHomePage text={"Home"}/>,
  },
  {
    path: WorkoutTrackerRoutes.ViewWorkouts,
    element: <WorkoutTrackerHomePage text={"Workouts"} />
  },
  {
    path: WorkoutTrackerRoutes.CreateWorkout,
    element: <WorkoutTrackerCreateWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.ExerciseIndex,
    element: <WorkoutTrackerExerciseIndexPage />
  },
  {
    path: WorkoutTrackerRoutes.CreateExercise,
    element: <WorkoutTrackerCreateExercisePage />
  },
  {
    path: WorkoutTrackerRoutes.ViewWorkout,
    element: <WorkoutTrackerShowWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.UpdateWorkout,
    element: <WorkoutTrackerHomePage text={"Workout History"}/>,
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <RouterProvider router={router} />
  </PageWrapper>
);
