import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutTrackerButton from "./WorkoutTrackerButton";
import { useNavigate } from "react-router";

type Props = {
  children?: React.ReactNode;
  title?: string;
  headerLink?: string;
}

const styles = stylex.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(229, 231, 235)",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px",
    minHeight: 24,
    padding: 24,
  },
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
});

export default function WorkoutTrackerContainer(props: Props) {
  return (
    <div {...stylex.props(styles.container)}>
      <WorkoutTrackerContainerHeader
        title={props.title}
        link={props.headerLink}
      />
      {props.children}
    </div>
  );
}

function WorkoutTrackerContainerHeader(props: { title?: string; link?: string }) {
  const navigate = useNavigate();
  const { title, link } = props;

  if (title == null && link == null) {
    return null;
  }

  const titleContainer =
    title && <div {...stylex.props(styles.containerTitle)}>{title}</div>;

  const buttonContainer =
    link && (
      <WorkoutTrackerButton
        text="Add New Workout"
        onClick={() => navigate(link)}
      />
    );

  return (
    <div {...stylex.props(styles.containerHeader)}>
      {titleContainer}
      {buttonContainer}
    </div>
  );
}
