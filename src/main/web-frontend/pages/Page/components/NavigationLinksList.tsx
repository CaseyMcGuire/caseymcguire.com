import * as React from "react";
import {createUseStyles} from "react-jss";
import {Link} from "react-router-dom";

const getStyles = createUseStyles({
  navigationBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  navigationList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row'
  },
  navBarItem: {
    marginRight: '7px'
  },
  navBarLink: {
    color: 'inherit',
    textDecoration: 'underline'
  },
  menuButtonContainer: {
    display: 'none'
  },
});

export default function NavigationLinksList() {
  const styles = getStyles();
    return (
      <ul className={styles.navigationList}>
        <NavigationLink name={"Home"} link={"/"}/>
        <NavigationLink name={"Resume"} link={"/resume"}/>
        <NavigationLink name={"Blog"} link={"/posts"}/>
        {
          // <NavigationLink name={"Projects"} link={"/projects"}/>
        }
        <NavigationLink name={"Contact"} link={"mailto:caseyjaymcguire@gmail.com"} />
      </ul>
    );
  }


function NavigationLink(props: {name: string, link: string}) {
  const styles = getStyles();
  return (
    <li className={styles.navBarItem}>
      <Link className={styles.navBarLink} to={props.link}>{props.name}</Link>
    </li>
  );
}