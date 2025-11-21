import {createBrowserRouter, RouterProvider} from "react-router";
import * as React from "react";
import {WorkoutTrackerHomePage} from "./pages/WorkoutTrackerHomePage";
import WorkoutTrackerCreateWorkoutPage from "./pages/WorkoutTrackerCreateWorkoutPage";
import WorkoutTrackerShowWorkoutPage from "./pages/WorkoutTrackerShowWorkoutPage/WorkoutTrackerShowWorkoutPage";
import WorkoutTrackerExerciseIndexPage from "./pages/WorkoutTrackerExercisesIndexPage";
import WorkoutTrackerCreateExercisePage from "./pages/WorkoutTrackerCreateExercisePage";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import {WorkoutTrackerRoutes} from "__generated__/routes/WorkoutTrackerRoutes";

const router = createBrowserRouter([
  {
    path: WorkoutTrackerRoutes.WORKOUT_INDEX,
    element: <WorkoutTrackerHomePage text={"Home"}/>,
  },
  {
    path: WorkoutTrackerRoutes.VIEW_WORKOUTS,
    element: <WorkoutTrackerHomePage text={"Workouts"} />
  },
  {
    path: WorkoutTrackerRoutes.CREATE_WORKOUT,
    element: <WorkoutTrackerCreateWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.EXERCISE_INDEX,
    element: <WorkoutTrackerExerciseIndexPage />
  },
  {
    path: WorkoutTrackerRoutes.CREATE_EXERCISE,
    element: <WorkoutTrackerCreateExercisePage />
  },
  {
    path: WorkoutTrackerRoutes.VIEW_WORKOUT,
    element: <WorkoutTrackerShowWorkoutPage />
  },
  {
    path: WorkoutTrackerRoutes.UPDATE_WORKOUT,
    element: <WorkoutTrackerHomePage text={"Workout History"}/>,
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <RouterProvider router={router} />
  </PageWrapper>
);