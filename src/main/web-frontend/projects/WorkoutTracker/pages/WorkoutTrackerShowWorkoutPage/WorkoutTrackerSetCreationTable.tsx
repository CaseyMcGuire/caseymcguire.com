import React from "react";
import {createUseStyles} from "react-jss";
import WorkoutTrackerDropdown from "../../components/WorkoutTrackerDropdown";
import WorkoutTrackerInputField from "../../components/WorkoutTrackerInputField";
import {combineClasses} from "utils/CssUtils";

type WorkoutTrackerSetCreationTableProps = {
  items: WorkoutTrackerSetCreationTableItem[]
}

export type WorkoutTrackerSetCreationTableItem = {
  setIndex: number,
  weight: number,
  reps: number
}

const useStyles = createUseStyles({
  setCreationRowContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '8px',
    gap: '2em'
  },
  rowHeader: {
    fontWeight: 'bold'
  },
  rowCell: {
    width: '25%', // this should be configurable at some point

  }
})

export default function WorkoutTrackerSetCreationTable(props: WorkoutTrackerSetCreationTableProps) {
  const styles = useStyles();
  const rowHeaderStyle = combineClasses([
    {
      className: styles.rowCell,
      include: true
    },
    {
      className: styles.rowHeader,
      include: true
    }
  ])
  return (
    <div className={styles.setCreationRowContainer}>
      <div className={styles.row}>
        <div className={rowHeaderStyle}>#</div>
        <div className={rowHeaderStyle}>Weight (lbs)</div>
        <div className={rowHeaderStyle}>Reps</div>
        <div className={rowHeaderStyle}>Status</div>
      </div>
      <WorkoutTrackerSetCreationRow />
    </div>
  )
}

function WorkoutTrackerSetCreationRow() {
  const styles = useStyles();
  return (
    <div className={styles.row}>
      <div className={styles.rowCell}>1</div>
      <div className={styles.rowCell}>
        <WorkoutTrackerInputField
          name={"weightDropdown"}
          handleTextChange={(text) => {}}
        />
      </div>
      <div className={styles.rowCell}>
        <WorkoutTrackerInputField
          name={"numberOfReps"}
          handleTextChange={() => {}}
        />
      </div>
      <div className={styles.rowCell}>Complete</div>
    </div>
  );
}