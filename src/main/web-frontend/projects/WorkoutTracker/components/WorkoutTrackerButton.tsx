import {createUseStyles} from "react-jss";
import * as React from "react";


const useStyles = createUseStyles({
  button: {
    padding: '8px 16px',
    backgroundColor: 'rgb(37, 99, 235)',
    borderRadius: '6px',
    color: 'rgb(255, 255, 255)',
    fontWeight: 400,
    fontSize: '16px',
    border: '0px solid rgb(229, 231, 235)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(37, 99, 235, 0.9)'
    }
  }
})

type Props = {
  text: string,
  onClick: () => void
}

export default function WorkoutTrackerButton(props: Props) {
  const styles = useStyles();
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.text}
    </button>
  )
}