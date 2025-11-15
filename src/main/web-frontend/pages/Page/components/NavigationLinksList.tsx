import * as React from "react";
import {createUseStyles} from "react-jss";
import {Link} from "react-router";
import CsrfToken from "components/csrf/CsrfToken";
import LoggedInComponentGating from "components/gating/LoggedInComponentGating";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
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
    textDecorationLine: 'none',
    display: 'flex'
  },
  navBarLink: {
    color: 'inherit',
    textDecorationLine: 'underline'
  },
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderStyle: 'none',
    font: 'inherit',
    cursor: 'pointer'
  },
  logoutButtonUnderline: {
    textDecorationLine: 'underline'
  },
  menuButtonContainer: {
    display: 'none'
  },
});

export default function NavigationLinksList(props: { isMobile: boolean }) {
  return (
    <ul
      {...stylex.props(
        props.isMobile ? styles.navigationListMobile : styles.navigationList,
      )}
    >
      <NavigationLink name="Home" link="/" isMobile={props.isMobile} />
      <NavigationLink name="Resume" link="/resume" isMobile={props.isMobile} />
      <NavigationLink name="Blog" link="/posts" isMobile={props.isMobile} />
      <NavigationLink
        name="Projects"
        link="/projects"
        isMobile={props.isMobile}
      />
      <NavigationLink
        name="Contact"
        link="mailto:caseyjaymcguire@gmail.com"
        isMobile={props.isMobile}
        useHardLink={true}
      />
      <LoggedInComponentGating>
        <NavigationLogoutLink isMobile={props.isMobile} />
      </LoggedInComponentGating>
    </ul>
  );
}

function NavigationLogoutLink(props: { isMobile: boolean }) {
  return (
    <li
      {...stylex.props(
        props.isMobile ? styles.navBarItemMobile : styles.navBarItem,
      )}
    >
      <form method="POST" action="/logout">
        <CsrfToken />
        <input
          {...stylex.props(
            styles.logoutButton,
            !props.isMobile && styles.logoutButtonUnderline,
          )}
          type="submit"
          value="Logout"
        />
      </form>
    </li>
  );
}

function NavigationLink(props: {
  name: string;
  link: string;
  isMobile: boolean;
  useHardLink?: boolean;
}) {
  const linkStyles = props.isMobile
    ? styles.navBarLinkMobile
    : styles.navBarLink;

  const itemStyles = props.isMobile
    ? styles.navBarItemMobile
    : styles.navBarItem;

  return (
    <li {...stylex.props(itemStyles)}>
      {props.useHardLink ? (
        <a {...stylex.props(linkStyles)} href={props.link}>
          {props.name}
        </a>
      ) : (
        <Link {...stylex.props(linkStyles)} to={props.link}>
          {props.name}
        </Link>
      )}
    </li>
  );
}