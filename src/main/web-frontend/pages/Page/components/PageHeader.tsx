import NavigationBar from "./NavigationBar";
import * as React from "react";
import {createUseStyles} from "react-jss";

const getStyles = createUseStyles({
  pageHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
    marginTop: '5px'
  },
  name: {
    fontSize: '30px'
  }
});

interface Props {
  onMenuButtonClick: () => void
}

export default function PageHeader(props: Props) {
  const styles = getStyles();
  return (
    <div className={styles.pageHeaderContainer}>
      <div>
        <span className={styles.name}>Casey McGuire</span>
      </div>
      <NavigationBar onMenuButtonClick={props.onMenuButtonClick}/>
    </div>
  )
}