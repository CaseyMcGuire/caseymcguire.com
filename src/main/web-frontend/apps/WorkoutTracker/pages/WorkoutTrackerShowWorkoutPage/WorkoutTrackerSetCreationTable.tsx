import React from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutTrackerInputField from "apps/WorkoutTracker/components/WorkoutTrackerInputField";

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
    <div sx={styles.setCreationRowContainer}>
      <div sx={styles.row}>
        <div sx={[styles.rowCell, styles.rowHeader]}>#</div>
        <div sx={[styles.rowCell, styles.rowHeader]}>
          Weight (lbs)
        </div>
        <div sx={[styles.rowCell, styles.rowHeader]}>Reps</div>
        <div sx={[styles.rowCell, styles.rowHeader]}>Status</div>
      </div>
      <WorkoutTrackerSetCreationRow />
    </div>
  );
}

function WorkoutTrackerSetCreationRow() {
  return (
    <div sx={styles.row}>
      <div sx={styles.rowCell}>1</div>
      <div sx={styles.rowCell}>
        <WorkoutTrackerInputField
          name={"weightDropdown"}
          handleTextChange={text => {}}
        />
      </div>
      <div sx={styles.rowCell}>
        <WorkoutTrackerInputField
          name={"numberOfReps"}
          handleTextChange={() => {}}
        />
      </div>
      <div sx={styles.rowCell}>Complete</div>
    </div>
  );
}