import {createUseStyles} from "react-jss";
import * as React from "react";
import MovieSidebar from "./MovieSidebar";

const useStyles = createUseStyles({
  root: {
    height: '100%',
    backgroundColor: "#141414",
    display: 'flex',
    flexDirection: 'row'
  },
  sidebar: {
    width: '10%',
    height: '100%'
  },
  sidebarContainer: {
    position: 'fixed'
  },
  content: {
    width: '90%',
    margin: '12px'
  }
});

type Props = {
  children: JSX.Element | null
}

export default function MovieRoot(props: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <MovieSidebar />
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )

}