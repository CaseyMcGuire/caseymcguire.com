import * as React from "react";
import {createUseStyles} from "react-jss";
import {Link} from "react-router-dom";
import CsrfToken from "../../../components/csrf/CsrfToken";
import LoggedInComponentGating from "../../../components/gating/LoggedInComponentGating";

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
  navigationListMobile: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '25px'
  },
  navBarItem: {
    marginRight: '7px'
  },
  navBarItemMobile: {
    margin: '5px 15px'
  },
  navBarLinkMobile: {
    textDecoration: 'none',
    display: 'flex'
  },
  navBarLink: {
    color: 'inherit',
    textDecoration: 'underline'
  },
  logoutButton: {
    backgroundColor: 'white',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer'
  },
  logoutButtonUnderline: {
    textDecoration: 'underline'
  },
  menuButtonContainer: {
    display: 'none'
  },
});

export default function NavigationLinksList(props: { isMobile: boolean }) {
  const styles = getStyles();
  return (
    <ul className={props.isMobile ? styles.navigationListMobile : styles.navigationList}>
      <NavigationLink name={"Home"} link={"/"} isMobile={props.isMobile}/>
      <NavigationLink name={"Resume"} link={"/resume"} isMobile={props.isMobile}/>
      <NavigationLink name={"Blog"} link={"/posts"} isMobile={props.isMobile}/>
      <NavigationLink name={"Projects"} link={"/projects"} isMobile={props.isMobile}/>
      <NavigationLink name={"Contact"} link={"mailto:caseyjaymcguire@gmail.com"} isMobile={props.isMobile} useHardLink={true}/>
      <LoggedInComponentGating>
          <NavigationLogoutLink isMobile={props.isMobile}/>
      </LoggedInComponentGating>
    </ul>
  );
}

function NavigationLogoutLink(props: {isMobile: boolean}) {
  const styles = getStyles();
  const classes = [styles.logoutButton];
  if (!props.isMobile) {
    classes.push(styles.logoutButtonUnderline)
  }

  return (
    <li className={props.isMobile ? styles.navBarItemMobile : styles.navBarItem}>
      <form method="POST" action="/logout">
        <CsrfToken />
        <input className={classes.join(' ')} type="submit" value="Logout" />
      </form>
    </li>
  );
}

function NavigationLink(props: { name: string, link: string, isMobile: boolean, useHardLink?: boolean }) {
  const styles = getStyles();
  return (
    <li className={props.isMobile ? styles.navBarItemMobile : styles.navBarItem}>
      {
        props.useHardLink ?
          <a className={props.isMobile ? styles.navBarLinkMobile : styles.navBarLink}
             href={props.link}>
            {props.name}
          </a> :
          <Link className={props.isMobile ? styles.navBarLinkMobile : styles.navBarLink}
                to={props.link}>
            {props.name}
          </Link>
      }
    </li>
  );
}