import React from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutTrackerInputLabel from "./WorkoutTrackerInputLabel";

type WorkoutTrackerDropdownProps = {
  label?: string;
  name: string;
  items: WorkoutTrackerDropdownOption[];
  selectedItem?: string;
  onItemSelect: (key: string) => void;
};

export type WorkoutTrackerDropdownOption = {
  key: string;
  displayText: string;
};

const styles = stylex.create({
  workoutTrackerDropdownContainer: {
    display: "flex",
    flexDirection: "column",
  },
  dropdown: {
    paddingBlock: 12,
    paddingInline: 8,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(209, 213, 219)",
  },
});

export default function WorkoutTrackerDropdown(props: WorkoutTrackerDropdownProps) {
  return (
    <div {...stylex.props(styles.workoutTrackerDropdownContainer)}>
      {props.label && (
        <WorkoutTrackerInputLabel name={props.name} labelText={props.label} />
      )}
      <select
        {...stylex.props(styles.dropdown)}
        name={props.name}
        value={props.selectedItem}
        onChange={(event) => props.onItemSelect(event.target.value)}
      >
        {props.items.map((item) => (
          <option key={item.key} value={item.key}>
            {item.displayText}
          </option>
        ))}
      </select>
    </div>
  );
}
