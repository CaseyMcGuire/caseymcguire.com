import * as React from "react";
import { useState } from "react";
import { graphql, useMutation } from "react-relay";
import WorkoutPage from "apps/WorkoutTracker/components/WorkoutPage";
import { WorkoutTrackerCreateWorkoutPageMutation } from "__generated__/relay/WorkoutTrackerCreateWorkoutPageMutation.graphql";
import { useNavigate } from "react-router";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";
import WorkoutTrackerButton from "../components/WorkoutTrackerButton";
import WorkoutTrackerInputField from "../components/WorkoutTrackerInputField";
import { WorkoutSidebarMenuId } from "../components/WorkoutSidebar";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  formElementContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "rgb(55, 65, 81)",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
  },
  textInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(209, 213, 219)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
});

type State = {
  description: string;
};

export default function WorkoutTrackerCreateWorkoutPage() {
  const [commit, isInFlight] =
    useMutation<WorkoutTrackerCreateWorkoutPageMutation>(graphql`
      mutation WorkoutTrackerCreateWorkoutPageMutation(
        $description: String!
      ) {
        createWorkout(description: $description) {
          success
          ... on SuccessfulWorkoutMutationResponse {
            workout {
              id
            }
          }
          ... on FailedWorkoutMutationResponse {
            userFacingErrorMessage
          }
        }
      }
    `);

  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    description: "",
  });

  if (isInFlight) {
    return <div>Loading</div>;
  }

  const onClick = () => {
    commit({
      variables: {
        description: state.description,
      },
      onCompleted: data => {
        const id = data.createWorkout?.workout?.id;
        if (id == null) {
          console.log("Request Failed");
          return;
        }
        navigate(`/workout_tracker/workout/${id}`);
      },
    });
  };

  return (
    <WorkoutPage
      title={"Workout"}
      selectedMenuItemId={WorkoutSidebarMenuId.WORKOUT}
    >
      <WorkoutTrackerContainer title={"Create New Workout"}>
        <WorkoutTrackerInputField
          label={"workoutDescription"}
          name={"Workout Description"}
          handleTextChange={text => setState({ description: text })}
        />
        <div {...stylex.props(styles.buttonContainer)}>
          <WorkoutTrackerButton text={"Save"} onClick={onClick} />
        </div>
      </WorkoutTrackerContainer>
    </WorkoutPage>
  );
}
