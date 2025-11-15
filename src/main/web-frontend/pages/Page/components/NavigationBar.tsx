import * as React from "react";
import NavigationLinksList from "./NavigationLinksList";
import MenuButton from "./MenuButton";
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
  navBarItem: {
    marginRight: 7
  },
  navBarLink: {
    color: 'inherit',
    textDecorationLine: 'underline'
  },
  navigationBarLinksContainer: {
    display: 'block',
    '@media (max-width: 600px)': {
      display: 'none'
    },
  },
  menuButtonContainer: {
    display: 'none',

    '@media (max-width: 600px)': {
      display: 'block',
    },
  },
});

interface Props {
  onMenuButtonClick: () => void
}


export default function NavigationBar(props: Props) {
  return (
    <div {...stylex.props(styles.navigationBarContainer)}>
      <div {...stylex.props(styles.navigationBarLinksContainer)}>
        <NavigationLinksList isMobile={false} />
      </div>
      <div {...stylex.props(styles.menuButtonContainer)}>
        <MenuButton onClick={props.onMenuButtonClick} />
      </div>
    </div>
  );
}