import * as React from "react";
import {createUseStyles} from "react-jss";
import WorkoutSidebar, {SIDEBAR_WIDTH} from "./WorkoutSidebar";
import {Suspense} from "react";


type Props = {
  children: React.ReactNode,
  title?: string
}

const useStyles = createUseStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(249 250 251)',
    height: '100%'
  },
  contentsContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    marginLeft: SIDEBAR_WIDTH,
    justifyContent: 'center',
  },
  contents: {
    width: '100%',
    padding: '32px',
    maxWidth: '1208px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700'
  }
})

export default function WorkoutPage(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.pageContainer}>
      <WorkoutSidebar />
      <div className={styles.contentsContainer}>
        <div className={styles.contents}>
          <Suspense fallback={<div>Loading</div>}>
            {
              props.title &&
                <div>
                    <span className={styles.title}>{props.title}</span>
                </div>
            }
            {props.children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
