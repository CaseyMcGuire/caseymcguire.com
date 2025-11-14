import {createBrowserRouter, RouterProvider} from "react-router";
import * as React from "react";
import {WorkoutTrackerHomePage} from "./pages/WorkoutTrackerHomePage";
import WorkoutTrackerCreateWorkoutPage from "./pages/WorkoutTrackerCreateWorkoutPage";
import WorkoutTrackerShowWorkoutPage from "./pages/WorkoutTrackerShowWorkoutPage/WorkoutTrackerShowWorkoutPage";
import WorkoutTrackerExerciseIndexPage from "./pages/WorkoutTrackerExercisesIndexPage";
import WorkoutTrackerCreateExercisePage from "./pages/WorkoutTrackerCreateExercisePage";
import RelayRoot from "components/relay/RelayRoot";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";

const router = createBrowserRouter([
  {
    path: "/workout_tracker",
    element: <WorkoutTrackerHomePage text={"Home"}/>,
  },
  {
    path: "/workout_tracker/workout",
    element: <WorkoutTrackerHomePage text={"Workouts"} />
  },
  {
    path: "/workout_tracker/workout/create",
    element: <WorkoutTrackerCreateWorkoutPage />
  },
  {
    path: "/workout_tracker/exercise",
    element: <WorkoutTrackerExerciseIndexPage />
  },
  {
    path: "/workout_tracker/exercise/create",
    element: <WorkoutTrackerCreateExercisePage />
  },
  {
    path: "/workout_tracker/workout/:id",
    element: <WorkoutTrackerShowWorkoutPage />
  },
  {
    path: "/workout_tracker/workout/:id/update",
    element: <WorkoutTrackerHomePage text={"Workout History"}/>,
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <RouterProvider router={router} />
  </PageWrapper>
);