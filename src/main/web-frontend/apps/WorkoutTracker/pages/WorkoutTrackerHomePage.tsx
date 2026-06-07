import * as React from "react";
import WorkoutPage from "../components/WorkoutPage";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WorkoutTrackerHomePageQuery} from "__generated__/relay/WorkoutTrackerHomePageQuery.graphql";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";
import {Link} from "react-router";
import {WorkoutSidebarMenuId} from "../components/WorkoutSidebar";
import {WorkoutTrackerRoutes} from "__generated__/routes/WorkoutTrackerRoutes";

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

  return (
      <WorkoutPage title={"Dashboard"} selectedMenuItemId={WorkoutSidebarMenuId.DASHBOARD}>
        <WorkoutTrackerContainer title={"Recent Workouts"} headerLink={WorkoutTrackerRoutes.CreateWorkout()}>
         {
            result.workoutTracker?.workouts?.map(workout => {
            const id = workout?.id
            if (id == null) {
              return null
            }
            return <div><Link to={WorkoutTrackerRoutes.ViewWorkout({ id: Number(id) })}>{id}</Link></div>
        })
      }
    </WorkoutTrackerContainer>
  </WorkoutPage>
  );
}
