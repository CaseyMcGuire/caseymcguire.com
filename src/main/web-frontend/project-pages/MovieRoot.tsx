import {createUseStyles} from "react-jss";
import * as React from "react";
import MovieSidebar from "./MovieSidebar";

const useStyles = createUseStyles({
  root: {
    height: '100%',
    backgroundColor: "#141414"
  }
});

type Props = {
  children: JSX.Element
}

export default function MovieRoot(props: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <MovieSidebar />
      {props.children}
    </div>
  )

}