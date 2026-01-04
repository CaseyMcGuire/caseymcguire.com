import * as React from "react";
import {useEffect, useState} from "react";
import PageHeader from "apps/MainApp/components/PageHeader";
import SideMenu from "apps/MainApp/components/SideMenu";
import {useLocation} from 'react-router';
import * as stylex from "@stylexjs/stylex";


const styles = stylex.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContent: {
    padding: 8,
    width: '100%',
    maxWidth: 900,
  },
});

export default function Page(props: {
  title?: string,
  children: React.ReactNode
}) {
  const location = useLocation();
  const [displaySideMenu, setDisplaySideMenu] = useState(false);
  const title = props.title;
  useEffect(() => {
    if (title != null ) {
      document.title = title
    }
    else {
      document.title = "Casey McGuire"
    }
  }, [title]);

  // make sure we close the menu on navigations.
  useEffect(() => {
    setDisplaySideMenu(false)
  }, [location.pathname])
  return (
    <div {...stylex.props(styles.pageContainer)}>
      <div {...stylex.props(styles.pageContent)}>
        <PageHeader
          onMenuButtonClick={() => setDisplaySideMenu(!displaySideMenu)}
        />
        {props.children}
      </div>
      <SideMenu
        onCloseClick={() => setDisplaySideMenu(!displaySideMenu)}
        display={displaySideMenu}
      />
    </div>
  );
}
