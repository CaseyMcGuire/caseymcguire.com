import React, {ReactNode} from "react";
import {createUseStyles} from "react-jss";

type Props = {
  children?: ReactNode
}

const useStyles = createUseStyles({
  workoutTrackerBox: {
    border: '1px solid rgb(229, 231, 235)',
    borderRadius: '12px',
    padding: '16px'
  }
})

export default function WorkoutTrackerBox(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.workoutTrackerBox}>
      {props.children}
    </div>
  )
}