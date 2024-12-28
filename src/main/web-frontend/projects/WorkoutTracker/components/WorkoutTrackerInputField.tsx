import {createUseStyles} from "react-jss";
import * as React from "react";

const useStyles = createUseStyles({
  formElementContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: 'rgb(55, 65, 81)',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px'
  },
  textInput: {
    padding: '12px 8px',
    borderRadius: '6px',
    fontSize: '16px',
    border: '1px solid rgb(209, 213, 219)'
  }
})

type Props = {
  label: string,
  name: string,
  handleTextChange: (elem: string) => void
}

export default function WorkoutTrackerInputField(props: Props) {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.formElementContainer}>
        <label className={styles.label} htmlFor={props.name}>{props.name}</label>
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