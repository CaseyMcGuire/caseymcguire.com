import {createUseStyles} from "react-jss";
import * as React from "react";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  sidebar: {
    minWidth: '96px',
    height: '90%',
    maxHeight: '960px',
    backgroundColor: '#404040',
    margin: '20px',
    borderRadius: '8px'
  },
  sidebarContents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: '36px',
    marginBottom: '76px'
  },
  navIcon: {
    height: '24px',
    width: '24px',
    margin: '20px',
    '&:hover': {
      // changing the color of SVGs defined in img tags is not straightforward. Thus, I used this hacky workaround
      // I found here: https://css-tricks.com/change-color-of-svg-on-hover/#aa-svg-background-images
      // using this tool here: https://codepen.io/sosuke/pen/Pjoqqp
      // note that that the first brightness and saturate attributes turn the SVG to black first otherwise the rest of
      // the attributes won't work (see description in link above)
      filter: 'brightness(0) saturate(100%) invert(34%) sepia(81%) saturate(2400%) hue-rotate(338deg) brightness(113%) contrast(100%)',
    }
  }
})

export default function MovieSidebar() {
  const styles = useStyles();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContents}>
        <img className={styles.logo} src={"/assets/images/movies/logo.svg"} />
      <Link to={"/movies"}>
        <img className={styles.navIcon} src={"/assets/images/movies/icon-nav-home.svg"} />
      </Link>
        <img className={styles.navIcon} src={"/assets/images/movies/icon-nav-movies.svg"} />
        <Link to={"/tv"}>
          <img className={styles.navIcon} src={"/assets/images/movies/icon-nav-tv-series.svg"} />
        </Link>
        <img className={styles.navIcon} src={"/assets/images/movies/icon-nav-bookmark.svg"} />
      </div>
    </div>
  )
}