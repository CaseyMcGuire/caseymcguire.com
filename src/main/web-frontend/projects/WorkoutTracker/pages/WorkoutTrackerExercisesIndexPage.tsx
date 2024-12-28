import WorkoutPage from "../components/WorkoutPage";
import {WorkoutSidebarMenuId} from "../components/WorkoutSidebar";
import React from "react";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {
  WorkoutTrackerExercisesIndexPageQuery
} from "__generated__/WorkoutTrackerExercisesIndexPageQuery.graphql";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  exerciseContainer: {
    marginBottom: '12px'
  }
})

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
  `
  const styles = useStyles();
  const result = useLazyLoadQuery<WorkoutTrackerExercisesIndexPageQuery>(query, {});
  return (
    <WorkoutPage title="Exercises"
                 titleLink={"/workout_tracker/exercise/create"}
                 selectedMenuItemId={WorkoutSidebarMenuId.EXERCISES}>
      {
        result.workoutTracker?.exercises?.map(elem => {
          return (
            <div className={styles.exerciseContainer}>
              <WorkoutTrackerContainer>
                {elem?.name}
              </WorkoutTrackerContainer>
            </div>
          )
        })
      }
    </WorkoutPage>
  )
}