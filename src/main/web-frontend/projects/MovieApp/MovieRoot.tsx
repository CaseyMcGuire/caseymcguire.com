import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import MovieSidebar from "./MovieSidebar";
import {ReactNode} from "react";

const styles = stylex.create({
  root: {
    height: "100%",
    backgroundColor: "#141414",
    display: "flex",
    flexDirection: "row",
  },
  sidebar: {
    width: "10%",
    height: "100%",
  },
  sidebarContainer: {
    position: "fixed",
  },
  content: {
    width: "90%",
    margin: 12,
  },
});

type Props = {
  children: ReactNode | null;
};

export default function MovieRoot(props: Props) {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.sidebar)}>
        <MovieSidebar />
      </div>
      <div {...stylex.props(styles.content)}>{props.children}</div>
    </div>
  );
}
