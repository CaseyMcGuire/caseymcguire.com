import * as React from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  sidebar: {
    minWidth: 96,
    height: "90%",
    maxHeight: 960,
    backgroundColor: "#404040",
    margin: 20,
    borderRadius: 8,
  },
  sidebarContents: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 36,
    marginBottom: 76,
  },
  navIcon: {
    height: 24,
    width: 24,
    margin: 20,
    ":hover": {
      // same filter hack as before
      filter:
        "brightness(0) saturate(100%) invert(34%) sepia(81%) saturate(2400%) hue-rotate(338deg) brightness(113%) contrast(100%)",
    },
  },
});

export default function MovieSidebar() {
  return (
    <div {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.sidebarContents)}>
        <img
          {...stylex.props(styles.logo)}
          src={"/assets/images/movies/logo.svg"}
        />
        <Link to={"/movies"}>
          <img
            {...stylex.props(styles.navIcon)}
            src={"/assets/images/movies/icon-nav-home.svg"}
          />
        </Link>
        <img
          {...stylex.props(styles.navIcon)}
          src={"/assets/images/movies/icon-nav-movies.svg"}
        />
        <Link to={"/tv"}>
          <img
            {...stylex.props(styles.navIcon)}
            src={"/assets/images/movies/icon-nav-tv-series.svg"}
          />
        </Link>
        <img
          {...stylex.props(styles.navIcon)}
          src={"/assets/images/movies/icon-nav-bookmark.svg"}
        />
      </div>
    </div>
  );
}
