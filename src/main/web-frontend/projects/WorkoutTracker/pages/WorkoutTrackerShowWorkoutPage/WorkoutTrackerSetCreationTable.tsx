import React from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutTrackerInputField from "projects/WorkoutTracker/components/WorkoutTrackerInputField";

type WorkoutTrackerSetCreationTableProps = {
  items: WorkoutTrackerSetCreationTableItem[];
};

export type WorkoutTrackerSetCreationTableItem = {
  setIndex: number;
  weight: number;
  reps: number;
};

const styles = stylex.create({
  setCreationRowContainer: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    gap: "2em",
  },
  rowHeader: {
    fontWeight: "bold",
  },
  rowCell: {
    width: "25%", // this should be configurable at some point
  },
});

export default function WorkoutTrackerSetCreationTable(
  props: WorkoutTrackerSetCreationTableProps,
) {
  return (
    <div {...stylex.props(styles.setCreationRowContainer)}>
      <div {...stylex.props(styles.row)}>
        <div {...stylex.props(styles.rowCell, styles.rowHeader)}>#</div>
        <div {...stylex.props(styles.rowCell, styles.rowHeader)}>
          Weight (lbs)
        </div>
        <div {...stylex.props(styles.rowCell, styles.rowHeader)}>Reps</div>
        <div {...stylex.props(styles.rowCell, styles.rowHeader)}>Status</div>
      </div>
      <WorkoutTrackerSetCreationRow />
    </div>
  );
}

function WorkoutTrackerSetCreationRow() {
  return (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.rowCell)}>1</div>
      <div {...stylex.props(styles.rowCell)}>
        <WorkoutTrackerInputField
          name={"weightDropdown"}
          handleTextChange={text => {}}
        />
      </div>
      <div {...stylex.props(styles.rowCell)}>
        <WorkoutTrackerInputField
          name={"numberOfReps"}
          handleTextChange={() => {}}
        />
      </div>
      <div {...stylex.props(styles.rowCell)}>Complete</div>
    </div>
  );
}