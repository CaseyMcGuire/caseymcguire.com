import WorkoutPage from "../components/WorkoutPage";
import { WorkoutSidebarMenuId } from "projects/WorkoutTracker/components/WorkoutSidebar";
import React, { useState } from "react";
import { graphql, useMutation } from "react-relay";
import WorkoutTrackerInputField from "projects/WorkoutTracker/components/WorkoutTrackerInputField";
import { useNavigate } from "react-router";
import WorkoutTrackerContainer from "projects/WorkoutTracker/components/WorkoutTrackerContainer";
import WorkoutTrackerButton from "projects/WorkoutTracker/components/WorkoutTrackerButton";
import {
  WorkoutTrackerCreateExercisePageMutation,
} from "__generated__/relay/WorkoutTrackerCreateExercisePageMutation.graphql";
import * as stylex from "@stylexjs/stylex";

type WorkoutTrackerCreateExercisePageState = {
  exerciseName: string | null;
};

const styles = stylex.create({
  exerciseNameContainer: {
    marginBottom: 12,
  },
});

export default function WorkoutTrackerCreateExercisePage() {
  const [state, setState] = useState<WorkoutTrackerCreateExercisePageState>({
    exerciseName: null,
  });
  const navigate = useNavigate();

  const [commit, isInFlight] =
    useMutation<WorkoutTrackerCreateExercisePageMutation>(
      graphql`
        mutation WorkoutTrackerCreateExercisePageMutation($name: String) {
          createExercise(name: $name) {
            success
            ... on SuccessfulExerciseMutationResponse {
              exercise {
                id
              }
            }
            ... on FailedExerciseMutationResponse {
              userFacingErrorMessage
            }
          }
        }
      `
    );

  const handleNameChange = (name: string) => {
    setState((prev) => ({
      ...prev,
      exerciseName: name,
    }));
  };

  const saveExercise = () => {
    commit({
      variables: {
        name: state.exerciseName,
      },
      onCompleted(data) {
        navigate("/workout_tracker/exercise");
      },
    });
  };

  return (
    <WorkoutPage
      title={"Create Exercise"}
      selectedMenuItemId={WorkoutSidebarMenuId.EXERCISES}
    >
      <WorkoutTrackerContainer>
        <div {...stylex.props(styles.exerciseNameContainer)}>
          <WorkoutTrackerInputField
            label={"exerciseName"}
            name={"Exercise Name"}
            handleTextChange={handleNameChange}
          />
        </div>
        <WorkoutTrackerButton text={"Save"} onClick={saveExercise} />
      </WorkoutTrackerContainer>
    </WorkoutPage>
  );
}
