import WorkoutPage from "../components/WorkoutPage";
import { WorkoutSidebarMenuId } from "../components/WorkoutSidebar";
import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { WorkoutTrackerExercisesIndexPageQuery } from "__generated__/relay/WorkoutTrackerExercisesIndexPageQuery.graphql";
import WorkoutTrackerContainer from "projects/WorkoutTracker/components/WorkoutTrackerContainer";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  exerciseContainer: {
    marginBottom: 12,
  },
});

export default function WorkoutTrackerExercisesIndexPage() {
  const query = graphql`
    query WorkoutTrackerExercisesIndexPageQuery {
      workoutTracker {
        exercises {
          id
          name
        }
      }
    }
  `;

  const result = useLazyLoadQuery<WorkoutTrackerExercisesIndexPageQuery>(
    query,
    {},
  );

  return (
    <WorkoutPage
      title="Exercises"
      titleLink={"/workout_tracker/exercise/create"}
      selectedMenuItemId={WorkoutSidebarMenuId.EXERCISES}
    >
      {result.workoutTracker?.exercises?.map(elem => {
        if (!elem) return null;
        return (
          <div
            key={elem.id}
            {...stylex.props(styles.exerciseContainer)}
          >
            <WorkoutTrackerContainer>{elem.name}</WorkoutTrackerContainer>
          </div>
        );
      })}
    </WorkoutPage>
  );
}
