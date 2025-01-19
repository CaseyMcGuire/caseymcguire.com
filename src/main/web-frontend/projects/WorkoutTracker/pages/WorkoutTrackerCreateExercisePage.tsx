import WorkoutPage from "../components/WorkoutPage";
import {WorkoutSidebarMenuId} from "../components/WorkoutSidebar";
import React, {useState} from "react";
import {graphql, useMutation} from "react-relay";
import WorkoutTrackerInputField from "../components/WorkoutTrackerInputField";
import {useNavigate} from "react-router";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";
import WorkoutTrackerButton from "../components/WorkoutTrackerButton";
import {
  WorkoutTrackerCreateExercisePageMutation
} from "__generated__/WorkoutTrackerCreateExercisePageMutation.graphql";
import {createUseStyles} from "react-jss";

type WorkoutTrackerCreateExercisePageState = {
  exerciseName: string | null
}

const useStyles = createUseStyles({
  exerciseNameContainer: {
    marginBottom: '12px'
  }
})

export default function WorkoutTrackerCreateExercisePage() {
  const [state, setState] = useState<WorkoutTrackerCreateExercisePageState>({
    exerciseName: null
  });
  const styles = useStyles();
  const navigate = useNavigate();

  const [commit, isInFlight] = useMutation<WorkoutTrackerCreateExercisePageMutation>(
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
  )

  const handleNameChange = (name: string) => {
    setState(prev => {
      return {
        ...prev,
        exerciseName: name
      }
    })
  }

  const saveExercise = () => {
    commit({
      variables: {
        name: state.exerciseName
      },
      onCompleted(data) {
        navigate("/workout_tracker/exercise")
      }
    })
  }

  return (
    <WorkoutPage
      title={"Create Exercise"}
      selectedMenuItemId={WorkoutSidebarMenuId.EXERCISES}>
      <WorkoutTrackerContainer>
        <div className={styles.exerciseNameContainer}>
          <WorkoutTrackerInputField
            label={"exerciseName"}
            name={"Exercise Name"}
            handleTextChange={handleNameChange}
          />
        </div>
        <WorkoutTrackerButton text={"Save"} onClick={saveExercise} />
      </WorkoutTrackerContainer>
    </WorkoutPage>
  )
}