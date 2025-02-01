import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import Common from './Common';
import PageHeader from "./components/PageHeader";
import SideMenu from "./components/SideMenu";
import {useLocation} from 'react-router';


const useStyles = createUseStyles({
  pageContainer: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageContent: {
    padding: '8px',
    width: '100%',
    maxWidth: Common.contentWidth
  }
});

export default function Page(props: {
  title?: string,
  children: React.ReactNode
}) {
  const styles = useStyles();
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
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <PageHeader onMenuButtonClick={() => setDisplaySideMenu(!displaySideMenu)}/>
        {props.children}
      </div>
      <SideMenu onCloseClick={() => setDisplaySideMenu(!displaySideMenu)} display={displaySideMenu}/>
    </div>
  )
}
