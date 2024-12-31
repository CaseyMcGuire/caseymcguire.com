import {createUseStyles} from "react-jss";
import * as React from "react";
import WorkoutTrackerInputLabel from "./WorkoutTrackerInputLabel";

const useStyles = createUseStyles({
  formElementContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  textInput: {
    padding: '12px 8px',
    borderRadius: '6px',
    fontSize: '16px',
    border: '1px solid rgb(209, 213, 219)'
  }
})

type Props = {
  label?: string,
  name: string,
  handleTextChange: (elem: string) => void
}

export default function WorkoutTrackerInputField(props: Props) {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.formElementContainer}>
        {
          props.label && <WorkoutTrackerInputLabel labelText={props.label} name={props.name} />
        }
        <input className={styles.textInput}
               name={props.name}
               type="text"
               onChange={event =>
                 props.handleTextChange(
                   event.target.value
                 )
               }
        />
      </div>
    </div>
  )
}