import * as React from "react";
import {createUseStyles} from "react-jss";
import WorkoutSidebar, {SIDEBAR_WIDTH} from "./WorkoutSidebar";
import {Suspense} from "react";


type Props = {
  children: React.JSX.Element
}

const useStyles = createUseStyles({
  pageContainer: {
    flexDirection: 'row'
  },
  contentsContainer: {
    height: '100%',
    marginLeft: SIDEBAR_WIDTH,
    backgroundColor: 'rgb(249 250 251)'
  }
})

export default function WorkoutPage(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.pageContainer}>
      <WorkoutSidebar />
      <div className={styles.contentsContainer}>
        <Suspense fallback={<div>Loading</div>}>
          {props.children}
        </Suspense>
      </div>
    </div>
  )
}
