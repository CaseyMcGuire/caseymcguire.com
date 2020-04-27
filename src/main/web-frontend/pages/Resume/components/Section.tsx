import * as React from "react";
import {createUseStyles} from "react-jss";

const getStyles = createUseStyles({
  sectionContainer: {
    marginBottom: '10px'
  },
  sectionContentContainer: {
    padding: '0px 20px'
  },
  sectionTitleContainer: {
    borderBottom: '1px solid black'
  },
  sectionTitle: {
    fontWeight: 'bold'
  }
});

interface Props {
  title: string,
  children: React.ReactNode
}

export default function Section(props: Props) {
  const styles = getStyles();
    return (
      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitleContainer}>
          <span className={styles.sectionTitle}>{props.title}</span>
        </div>
        <div className={styles.sectionContentContainer}>
          {props.children}
        </div>
      </div>
    )
  }
