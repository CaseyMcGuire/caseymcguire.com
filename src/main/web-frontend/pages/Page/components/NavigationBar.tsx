import * as React from "react";
import NavigationLinksList from "./NavigationLinksList";
import MenuButton from "./MenuButton";
import {createUseStyles} from "react-jss";

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
  navigationBarLinksContainer: {
    display: 'block'
  },
  '@media only screen and (max-width: 600px)': {
    navigationBarLinksContainer: {
      display: 'none'
    },
    menuButtonContainer: {
      display: 'block'
    }
  }
});

interface Props {
  onMenuButtonClick: () => void
}

export default function NavigationBar(props: Props) {
  const style = getStyles();
  return (
    <div className={style.navigationBarContainer}>
      <div className={style.navigationBarLinksContainer}>
        <NavigationLinksList isMobile={false}/>
      </div>
      <div className={style.menuButtonContainer}>
        <MenuButton onClick={props.onMenuButtonClick}/>
      </div>
    </div>
  );
}