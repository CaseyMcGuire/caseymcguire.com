import WorkoutTrackerBox from "projects/WorkoutTracker/components/WorkoutTrackerBox";
import WorkoutTrackerDropdown, {
  WorkoutTrackerDropdownOption,
} from "projects/WorkoutTracker/components/WorkoutTrackerDropdown";
import * as React from "react";
import { useFragment } from "react-relay/hooks";
import { graphql } from "react-relay";
import { WorkoutTrackerExerciseSection_workoutTracker$key } from "__generated__/WorkoutTrackerExerciseSection_workoutTracker.graphql";
import WorkoutTrackerSetCreationTable, {
  WorkoutTrackerSetCreationTableItem,
} from "projects/WorkoutTracker/pages/WorkoutTrackerShowWorkoutPage/WorkoutTrackerSetCreationTable";
import * as stylex from "@stylexjs/stylex";

type WorkoutTrackerExerciseSectionProps = {
  workoutTracker: WorkoutTrackerExerciseSection_workoutTracker$key | null;
  selectedExerciseId: string;
  items: WorkoutTrackerSetCreationTableItem[];
  enableAddingSets: boolean;
};

const styles = stylex.create({
  exerciseDropdownContainer: {
    marginBottom: 8,
  },
});

export default function WorkoutTrackerExerciseSection(
  props: WorkoutTrackerExerciseSectionProps,
) {
  const data = useFragment<WorkoutTrackerExerciseSection_workoutTracker$key>(
    graphql`
      fragment WorkoutTrackerExerciseSection_workoutTracker on WorkoutTracker {
        exercises {
          id
          name
        }
      }
    `,
    props.workoutTracker,
  );

  const dropdownOptions: WorkoutTrackerDropdownOption[] =
    data?.exercises?.flatMap(exercise => {
      if (exercise == null) {
        return [];
      }
      const { id, name } = exercise;
      return [
        {
          key: id,
          displayText: name,
        },
      ];
    }) ?? [];

  return (
    <WorkoutTrackerBox>
      <div {...stylex.props(styles.exerciseDropdownContainer)}>
        <WorkoutTrackerDropdown
          name={"exercises"}
          label={"Exercise Type"}
          selectedItem={props.selectedExerciseId}
          items={dropdownOptions}
          onItemSelect={item => {
            console.log(item);
          }}
        />
      </div>
      <WorkoutTrackerSetCreationTable items={props.items} />
    </WorkoutTrackerBox>
  );
}
