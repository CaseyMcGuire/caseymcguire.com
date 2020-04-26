import * as React from "react";
import {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import Common from './Common';
import PageHeader from "./components/PageHeader";
import SideMenu from "./components/SideMenu";
import { useLocation } from 'react-router';

const getStyles = createUseStyles({
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
  children: React.ReactNode
}) {
  const styles = getStyles();
  const location = useLocation();
  const [displaySideMenu, setDisplaySideMenu] = useState(false);
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
