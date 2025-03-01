import * as React from "react";
import {createUseStyles} from "react-jss";
import WorkoutSidebar, {SIDEBAR_WIDTH, WorkoutSidebarMenuId} from "./WorkoutSidebar";
import {Suspense} from "react";
import WorkoutTrackerButton from "./WorkoutTrackerButton";
import {useNavigate} from "react-router";


type Props = {
  children: React.ReactNode,
  title?: string,
  titleLink?: string,
  selectedMenuItemId: WorkoutSidebarMenuId,
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8px'
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
      <WorkoutSidebar selectedMenuItemId={props.selectedMenuItemId} />
      <div className={styles.contentsContainer}>
        <div className={styles.contents}>
          <Suspense fallback={<div>Loading</div>}>
            {
              props.title && <WorkoutTrackerPageHeader
                    title={props.title}
                    link={props.titleLink}
                />
            }
            {props.children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

type WorkoutPageHeaderProps = {
  title: string,
  link?: string | null
}

function WorkoutTrackerPageHeader(props: WorkoutPageHeaderProps) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { link } = props;
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{props.title}</span>
      {
        link &&
          <WorkoutTrackerButton text={"Create Exercise"} onClick={() => navigate(link)} />
      }
    </div>
  );
}
