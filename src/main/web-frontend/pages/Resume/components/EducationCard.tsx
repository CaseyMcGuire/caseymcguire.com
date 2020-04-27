import * as React from "react";
import {createUseStyles} from "react-jss";


const getStyles = createUseStyles({
  educationCardContainer: {
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  schoolInfoContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  universityName: {
    fontWeight: 'bold'
  },
  graduationDate: {
    fontStyle: 'italic'
  },
  '@media only screen and (max-width: 600px)': {
    educationCardContainer: {
      flexDirection: 'column'
    }
  }
});


interface Props {
  universityName: string,
  major: string,
  minor?: string,
  graduationDate: string
}

export default function EducationCard(props: Props) {
  const {
    universityName,
    major,
    minor,
    graduationDate
  } = props;
  const styles = getStyles();
  return (
    <div className={styles.educationCardContainer}>
      <div className={styles.schoolInfoContainer}>
        <div>
          <span className={styles.universityName}>{universityName}</span>
        </div>
        <div>
          <span>{major}</span>
        </div>
        <div>
          <span>{minor}</span>
        </div>
      </div>
      <div>
        <span className={styles.graduationDate}>Graduated {graduationDate}</span>
      </div>
    </div>
  )
}
