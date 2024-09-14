import * as React from "react";
import * as ReactDOM from "react-dom";

export function WorkoutTrackerRoot() {
  return <div>
    Workout Tracker!
  </div>
}

ReactDOM.render(
  <WorkoutTrackerRoot />,
  document.getElementById("root")
);