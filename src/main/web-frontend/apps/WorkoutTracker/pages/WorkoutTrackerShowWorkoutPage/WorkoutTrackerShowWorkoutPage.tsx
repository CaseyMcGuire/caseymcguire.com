import {graphql} from "react-relay";
import {useNavigate, useParams} from "react-router";
import {useLazyLoadQuery} from "react-relay/hooks";
import * as React from "react";
import {useEffect} from "react";
import {WorkoutTrackerShowWorkoutPageQuery} from "__generated__/relay/WorkoutTrackerShowWorkoutPageQuery.graphql";
import WorkoutPage from "apps/WorkoutTracker/components/WorkoutPage";
import WorkoutTrackerContainer from "../../components/WorkoutTrackerContainer";
import {WorkoutSidebarMenuId} from "../../components/WorkoutSidebar";
import WorkoutTrackerDropdown, {WorkoutTrackerDropdownOption} from "../../components/WorkoutTrackerDropdown";
import WorkoutTrackerSetCreationTable, {WorkoutTrackerSetCreationTableItem} from "./WorkoutTrackerSetCreationTable";
import WorkoutTrackerExerciseSection from "./WorkoutTrackerExerciseSection";

type Section = {
  exerciseId: string,
  items: WorkoutTrackerSetCreationTableItem[]
}

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
            weight
            numReps
            exercise {
              id
              name
            }
          }
        }
        ...WorkoutTrackerExerciseSection_workoutTracker
      }
    }
  `;

  const response = useLazyLoadQuery<WorkoutTrackerShowWorkoutPageQuery>(query, {
    id
  });

  const workout = response.workoutTracker?.workoutById;

  if (!workout) {
    return (
      <WorkoutPage selectedMenuItemId={WorkoutSidebarMenuId.WORKOUT}>
        <WorkoutTrackerContainer title="Workout">
          <div>Workout not found.</div>
        </WorkoutTrackerContainer>
      </WorkoutPage>
    );
  }

  const tableItems: WorkoutTrackerSetCreationTableItem[] = response.workoutTracker?.workoutById?.sets.flatMap((set, index) => {
    if (set == null) {
      return []
    }

    return [{
      setIndex: index + 1,
      weight: 100,
      reps: set.numReps
    }];
  }) ?? []

  const sections: Section[] = response.workoutTracker?.workoutById?.sets.reduce<Section[]>(
    (acc, set, index) => {
      if (set == null) {
        return acc
      }
      const last = acc.at(-1)
    if (last == null) {
      return [{
        exerciseId: set.exercise.id,
        items: [{
          setIndex: index + 1,
          weight: 100,
          reps: set.numReps
        }]
      }]
    }
    else if (last.exerciseId == set.exercise.id) {
      last.items.push({
        setIndex: index + 1,
        weight: 100,
        reps: set.numReps
      });
      return acc
    }
    else {
      return [...acc, {
        exerciseId: set.exercise.id,
        items: [{
          setIndex: index + 1,
          weight: 100,
          reps: set.numReps
        }]
      }]
    }
  }, []) ?? [];

  return (
    <WorkoutPage selectedMenuItemId={WorkoutSidebarMenuId.WORKOUT}>
      <div>
        <WorkoutTrackerContainer title="Workout">
          {
            sections.map((section, index) => {
              return (
                <WorkoutTrackerExerciseSection
                  workoutTracker={response.workoutTracker}
                  selectedExerciseId={section.exerciseId}
                  items={section.items}
                  enableAddingSets={index == sections.length - 1}
                />
              )
            })
          }
          <WorkoutTrackerExerciseSection
            workoutTracker={response.workoutTracker}
            selectedExerciseId={""}
            items={tableItems}
            enableAddingSets={true}
          />
        </WorkoutTrackerContainer>
      </div>
    </WorkoutPage>
  )
}