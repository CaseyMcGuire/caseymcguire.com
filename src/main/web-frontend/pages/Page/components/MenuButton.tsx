import * as React from "react";
import {createUseStyles} from "react-jss";

const getStyles = createUseStyles({
  menuButton: {
    padding: '5px'
  },
  menuButtonLine: {
    height: '2px',
    width: '19px',
    backgroundColor: '#2F2F2F',
    '&:nth-child(2), &:nth-child(3)': {
      marginTop: '4px'
    }
  }
});

interface Props {
  onClick: () => void
}

export default function MenuButton(props: Props) {
  const styles = getStyles();
  return (
    <div onClick={props.onClick} className={styles.menuButton}>
      <div className={styles.menuButtonLine}/>
      <div className={styles.menuButtonLine}/>
      <div className={styles.menuButtonLine}/>
    </div>
  )
}
