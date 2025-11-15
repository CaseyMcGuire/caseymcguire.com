import React, { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type Props = {
  children?: ReactNode;
};

const styles = stylex.create({
  workoutTrackerBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(229, 231, 235)",
    borderRadius: 12,
    padding: 16,
  },
});

export default function WorkoutTrackerBox(props: Props) {
  return <div {...stylex.props(styles.workoutTrackerBox)}>{props.children}</div>;
}
