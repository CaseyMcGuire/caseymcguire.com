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
    path: WorkoutTrackerRoutes.WorkoutIndex.path,
    element: <WorkoutTrackerHomePage text={"Home"}/>,
  },
  {
    path: WorkoutTrackerRoutes.ViewWorkouts.path,
    element: <WorkoutTrackerHomePage text={"Workouts"} />
  },
  {
    path: WorkoutTrackerRoutes.CreateWorkout.path,
    element: <WorkoutTrackerCreateWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.ExerciseIndex.path,
    element: <WorkoutTrackerExerciseIndexPage />
  },
  {
    path: WorkoutTrackerRoutes.CreateExercise.path,
    element: <WorkoutTrackerCreateExercisePage />
  },
  {
    path: WorkoutTrackerRoutes.ViewWorkout.path,
    element: <WorkoutTrackerShowWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.UpdateWorkout.path,
    element: <WorkoutTrackerHomePage text={"Workout History"}/>,
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <RouterProvider router={router} />
  </PageWrapper>
);
