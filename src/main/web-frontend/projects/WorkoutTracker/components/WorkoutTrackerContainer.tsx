import * as React from "react";
import {createUseStyles} from "react-jss";


type Props = {
  children: React.ReactNode,
  title?: string
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
  containerTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px'
  }
});

export default function WorkoutTrackerContainer(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}