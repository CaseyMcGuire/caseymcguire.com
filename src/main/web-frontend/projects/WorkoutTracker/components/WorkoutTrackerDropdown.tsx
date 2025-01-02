import React from "react";
import {createUseStyles} from "react-jss";
import WorkoutTrackerInputLabel from "./WorkoutTrackerInputLabel";

type WorkoutTrackerDropdownProps = {
  label?: string,
  name: string,
  items: WorkoutTrackerDropdownOption[],
  selectedItem?: string,
  onItemSelect: (key: string) => void
}

export type WorkoutTrackerDropdownOption = {
  key: string,
  displayText: string
}

const useStyles = createUseStyles({
  workoutTrackerDropdownContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  dropdown: {
    padding: '12px 8px',
    borderRadius: '6px',
    fontSize: '16px',
    border: '1px solid rgb(209, 213, 219)'
  }
})


export default function WorkoutTrackerDropdown(props: WorkoutTrackerDropdownProps) {
  const styles = useStyles();
  return (
    <div className={styles.workoutTrackerDropdownContainer}>
      {
        props.label && <WorkoutTrackerInputLabel name={props.name} labelText={props.label} />
      }
      <select className={styles.dropdown}
              name={props.name}
              value={props.selectedItem}
              onChange={event => props.onItemSelect(event.target.value)}>
        {
          props.items.map(item => {
            return (
              <option value={item.key}>{item.displayText}</option>
            )
          })
        }
      </select>
    </div>
  )
}