import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutTrackerInputLabel from "./WorkoutTrackerInputLabel";

const styles = stylex.create({
  formElementContainer: {
    display: "flex",
    flexDirection: "column",
  },
  textInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(209, 213, 219)",
  },
});

type Props = {
  label?: string;
  name: string;
  handleTextChange: (elem: string) => void;
};

export default function WorkoutTrackerInputField(props: Props) {
  return (
    <div>
      <div {...stylex.props(styles.formElementContainer)}>
        {props.label && (
          <WorkoutTrackerInputLabel
            labelText={props.label}
            name={props.name}
          />
        )}
        <input
          {...stylex.props(styles.textInput)}
          name={props.name}
          type="text"
          onChange={event => props.handleTextChange(event.target.value)}
        />
      </div>
    </div>
  );
}