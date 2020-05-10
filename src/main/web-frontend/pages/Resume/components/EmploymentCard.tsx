import * as React from "react";
import {createUseStyles} from "react-jss";

interface Props {
  title: string,
  employmentDate?: string,
  companyName: string,
  location?: string,
  description: string[]
}

const getStyles = createUseStyles({
  employmentCardContainer: {
    marginBottom: '13px'
  },
  header: {
    margin: '6px 0px'
  },
  companyEmploymentDateContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  companyNameLocationContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  locationContainer: {
    textAlign: 'right'
  },
  title: {
    fontWeight: 'bold'
  },
  companyName: {
    fontStyle: 'italic'
  },
  location: {
    fontStyle: 'italic'
  },
  '@media only screen and (max-width: 600px)': {
    companyEmploymentDateContainer: {
      flexDirection: 'column'
    },
    companyNameLocationContainer: {
      flexDirection: 'column'
    },
    locationContainer: {
      textAlign: 'left'
    }
  }
});

export default function EmploymentCard(props: Props) {
  const {title, employmentDate, companyName, location, description} = props;
  const styles = getStyles();
  return (
    <div className={styles.employmentCardContainer}>
      <div className={styles.header}>
        <div className={styles.companyEmploymentDateContainer}>
          <div>
            <span className={styles.title}>{title}</span>
          </div>
          <div>
            <span>{employmentDate}</span>
          </div>
        </div>
        <div className={styles.companyNameLocationContainer}>
          <div>
            <span className={styles.companyName}>{companyName}</span>
          </div>
          <div className={styles.locationContainer}>
            <span className={styles.location}>{location}</span>
          </div>
        </div>
      </div>
      <ul>
        {
          description.map((elem, index) => <li key={index}>{elem}</li>)
        }
      </ul>
    </div>
  )
}
