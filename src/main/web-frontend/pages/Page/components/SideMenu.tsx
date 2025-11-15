import * as React from "react";
import NavigationLinksList from "./NavigationLinksList";
import * as stylex from "@stylexjs/stylex";

interface Props {
  display: boolean,
  onCloseClick: () => void
}

const styles = stylex.create({
  sideMenuGlass: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    transitionProperty: 'opacity',
    transitionDuration: '0.3s',
    // in order to get the transition to work, we just make this an invisible div over the top
    // of the viewport that click events pass through.
    opacity: 0,
    pointerEvents: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  sideMenuGlassVisible: {
    opacity: 0.8,
    pointerEvents: 'all',
  },
  sideMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: 0,
    zIndex: 2,
    backgroundColor: 'white',
    transitionProperty: 'width',
    transitionDuration: '0.5s',
    paddingTop: 25,
  },
  sideMenuVisible: {
    width: '65%',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: '#EEEEEE',
  },
});


export default function SideMenu(props: Props) {
  return (
    <div>
      <div
        onClick={props.onCloseClick}
        {...stylex.props(
          styles.sideMenuGlass,
          props.display && styles.sideMenuGlassVisible,
        )}
      />
      <div
        {...stylex.props(
          styles.sideMenu,
          props.display && styles.sideMenuVisible,
        )}
      >
        <NavigationLinksList isMobile />
      </div>
    </div>
  );
}