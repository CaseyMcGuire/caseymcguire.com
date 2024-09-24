import * as React from "react";
import * as ReactDOM from "react-dom";
import {graphql} from "react-relay";

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
    Workout Tracker!
  </div>
}

ReactDOM.render(
  <WorkoutTrackerRoot />,
  document.getElementById("root")
);