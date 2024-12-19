import * as React from "react";
import {Link} from "react-router-dom";
import WorkoutPage from "../components/WorkoutPage";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {
  WorkoutTrackerHomePageQuery
} from "../../../__generated__/WorkoutTrackerHomePageQuery.graphql";

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

  return <WorkoutPage>
    <Link to={"/workout/12"}>{props.text}</Link>
  </WorkoutPage>
}
