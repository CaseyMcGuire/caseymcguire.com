import * as React from "react";
import * as ReactDOM from "react-dom";
import {graphql} from "react-relay";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";

export function WorkoutTrackerRoot() {
  const query = graphql`
    query WorkoutTrackerRootQuery {
      workoutTracker {
        workouts {
          id
          description
        }
      }
    }
  `
  return <div>
    <Link to={"/workout/12"}>Workout Tracker!</Link>
  </div>
}


const router = createBrowserRouter([
  {
    path: "/workout",
    element: <WorkoutTrackerRoot />,
  },
  {
    path: "/workout/:id",
    element: <div>hello</div>
  }
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);