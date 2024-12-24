import {graphql} from "react-relay";
import {useNavigate, useParams} from "react-router-dom";
import {useLazyLoadQuery} from "react-relay/hooks";
import * as React from "react";
import {WorkoutTrackerShowWorkoutPageQuery} from "__generated__/WorkoutTrackerShowWorkoutPageQuery.graphql";
import {useEffect} from "react";
import WorkoutPage from "../components/WorkoutPage";
import WorkoutTrackerContainer from "../components/WorkoutTrackerContainer";


export default function WorkoutTrackerShowWorkoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id == null) {
      navigate('/');
    }
  }, [id, navigate]);

  if (id == null) {
    return null
  }

  const query = graphql`
    query WorkoutTrackerShowWorkoutPageQuery($id: ID!) {
      workoutTracker {
        workoutById(id: $id) {
          id
          description
          sets {
            numReps
          }
        }
      }
    }
  `;

  const response = useLazyLoadQuery<WorkoutTrackerShowWorkoutPageQuery>(query, {
    id
  });

  const workout = response.workoutTracker?.workoutById;

  if (!workout) {
    return (
      <WorkoutPage>
        <WorkoutTrackerContainer title="Workout">
          <div>Workout not found.</div>
        </WorkoutTrackerContainer>
      </WorkoutPage>
    );
  }

  return (
    <WorkoutPage>
      <div>
        <WorkoutTrackerContainer title="Workout">
          {response.workoutTracker?.workoutById?.description}
        </WorkoutTrackerContainer>
      </div>
    </WorkoutPage>
  )
}