import * as React from "react";
import {createUseStyles} from "react-jss";
import WorkoutTrackerButton from "./WorkoutTrackerButton";
import {useNavigate} from "react-router-dom";


type Props = {
  children?: React.ReactNode,
  title?: string,
  headerLink?: string
}

const useStyles = createUseStyles({
  container: {
    borderRadius: '12px',
    border: '1px solid rgb(229, 231, 235)',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px',
    minHeight: '24px',
    padding: '24px'
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  containerTitle: {
    fontSize: '18px',
    fontWeight: '600'
  }
});

export default function WorkoutTrackerContainer(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <WorkoutTrackerContainerHeader title={props.title} link={props.headerLink} />
      {props.children}
    </div>
  )
}

function WorkoutTrackerContainerHeader(props: {
  title?: string,
  link?: string
}) {
  const styles = useStyles();
  const navigate = useNavigate();
  const {title, link} = props;
  if (title == null && link == null) {
    return null
  }
  const titleContainer = title && <div className={styles.containerTitle}>
    {title}
  </div>;
  const buttonContainer =
    link &&
      <WorkoutTrackerButton
          text="Add New Workout"
          onClick={() => navigate(link)}
      />;

  return (
    <div className={styles.containerHeader}>
      {titleContainer}
      {buttonContainer}
    </div>
  )
}