import * as React from "react";
import WorkoutPage from "../components/WorkoutPage";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {
  WorkoutTrackerHomePageQuery
} from "__generated__/WorkoutTrackerHomePageQuery.graphql";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";
import {Link} from "react-router-dom";

type Props = {
  text: string
}

export function WorkoutTrackerHomePage(props: Props) {

  const query = graphql`
    query WorkoutTrackerHomePageQuery {
      workoutTracker {
        workouts {
          id
          description
        }
      }
    }
    `;

  const result = useLazyLoadQuery<WorkoutTrackerHomePageQuery>(query, {})

  return <WorkoutPage title={"Dashboard"}>
    <WorkoutTrackerContainer title={"Recent Workouts"}>
      {
        result.workoutTracker?.workouts?.map(workout => {
          const id = workout?.id
          if (id == null) {
            return null
          }
          return <div><Link to={`/workout_tracker/workout/${id}`}>{id}</Link></div>
        })
      }
    </WorkoutTrackerContainer>
  </WorkoutPage>
}
