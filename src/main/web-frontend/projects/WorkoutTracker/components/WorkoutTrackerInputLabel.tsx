import {createUseStyles} from "react-jss";
import * as React from "react";


type Props = {
  name: string,
  labelText: string
}

const useStyles = createUseStyles({
  label: {
    color: 'rgb(55, 65, 81)',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px'
  }
})

export default function WorkoutTrackerInputLabel(props: Props) {
  const styles = useStyles();
  return (
    <label className={styles.label} htmlFor={props.name}>{props.labelText}</label>
  )
}