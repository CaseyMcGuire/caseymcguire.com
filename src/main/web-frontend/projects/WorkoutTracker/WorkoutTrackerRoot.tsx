import {createBrowserRouter, RouterProvider} from "react-router-dom";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {WorkoutTrackerHomePage} from "./pages/WorkoutTrackerHomePage";
import {RelayConfig} from "../../relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {Suspense} from "react";
import WorkoutTrackerCreateWorkoutPage from "./pages/WorkoutTrackerCreateWorkoutPage";
import WorkoutTrackerShowWorkoutPage from "./pages/WorkoutTrackerShowWorkoutPage";
import WorkoutTrackerExerciseIndexPage from "./pages/WorkoutTrackerExercisesIndexPage";
import WorkoutTrackerCreateExercisePage from "./pages/WorkoutTrackerCreateExercisePage";

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

ReactDOM.render(
  <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()}>
    <Suspense fallback={<div>Loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </RelayEnvironmentProvider>,
  document.getElementById("root")
);