import * as React from "react";
import * as stylex from "@stylexjs/stylex";

type Props = {
  name: string;
  labelText: string;
};

const styles = stylex.create({
  label: {
    color: "rgb(55, 65, 81)",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
  },
});

export default function WorkoutTrackerInputLabel(props: Props) {
  return (
    <label {...stylex.props(styles.label)} htmlFor={props.name}>
      {props.labelText}
    </label>
  );
}