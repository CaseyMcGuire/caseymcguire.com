import * as React from "react";
import NavigationLinksList from "./NavigationLinksList";
import {createUseStyles} from "react-jss";
import Common from "../Common";

interface Props {
  display: boolean,
  onCloseClick: () => void
}

const getStyles = createUseStyles({
  sideMenuGlass: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    webkitTransition: 'opacity 0.3s',
    transition: 'opacity 0.3s',

    // in order to get the transition to work, we just make this an invisible div over the top
    // of the viewport that click events pass through.
    opacity: 0.0,
    pointerEvents: 'none',
    webkitTapHighlightColor: 'transparent'
  },
  sideMenuGlassVisible: {
    opacity: 0.8,
    pointerEvents: 'all'
  },
  sideMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: 0,
    zIndex: 2,
    backgroundColor: 'white',
    transition: 'width .5s',
    paddingTop: '25px',
  },
  sideMenuVisible: {
    width: '65%',
    borderLeft: '1px #EEEEEE solid'
  },
});

export default function SideMenu(props: Props) {
  const styles = getStyles();
  const sideMenuClass = styles.sideMenu + (props.display ? " " + styles.sideMenuVisible : "");
  const sideMenuGlassClass = styles.sideMenuGlass + (props.display ? " " + styles.sideMenuGlassVisible : "");
  return (
    <div>
      <div onClick={props.onCloseClick} className={sideMenuGlassClass}/>
      <div className={sideMenuClass}>
        <NavigationLinksList isMobile={true}/>
      </div>
    </div>
  )
}