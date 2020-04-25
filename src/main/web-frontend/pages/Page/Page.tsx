import * as React from "react";
import {useState} from "react";
import {createUseStyles} from "react-jss";
import Common from './Common';
import PageHeader from "./components/PageHeader";

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
  const [displaySideMenu, setDisplaySideMenu] = useState(false);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <PageHeader onMenuButtonClick={() => setDisplaySideMenu(!displaySideMenu)}/>
        {props.children}
      </div>
      {/*<SideMenu onCloseClick={this.toggleSideMenu} display={this.state.displaySideMenu}/>*/}
    </div>
  )
}
