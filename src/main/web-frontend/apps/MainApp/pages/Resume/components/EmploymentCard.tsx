import * as React from "react";
import * as stylex from "@stylexjs/stylex";

interface Props {
  title: string;
  employmentDate?: string;
  companyName: string;
  location?: string;
  description: string[];
  link?: {
    text: string;
    href: string;
  };
}

const styles = stylex.create({
  employmentCardContainer: {
    marginBottom: 13,
  },
  header: {
    marginTop: 6,
    marginBottom: 6,
  },
  companyEmploymentDateContainer: {
    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  companyNameLocationContainer: {
    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  locationContainer: {
    textAlign: "right",

    "@media (max-width: 600px)": {
      textAlign: "left",
    },
  },
  title: {
    fontWeight: "bold",
  },
  companyName: {
    fontStyle: "italic",
  },
  location: {
    fontStyle: "italic",
  },
});

export default function EmploymentCard(props: Props) {
  const { title, employmentDate, companyName, location, description } = props;

  return (
    <div sx={styles.employmentCardContainer}>
      <div sx={styles.header}>
        <div sx={styles.companyEmploymentDateContainer}>
          <div>
            <span sx={styles.title}>{title}</span>
          </div>
          <div>
            <span>{employmentDate}</span>
          </div>
        </div>
        <div sx={styles.companyNameLocationContainer}>
          <div>
            <span sx={styles.companyName}>{companyName}</span>
          </div>
          <div sx={styles.locationContainer}>
            <span sx={styles.location}>{location}</span>
          </div>
        </div>
      </div>
      <ul>
        {description.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
        {props.link != null ? (
          <li>
            <a href={props.link.href}>{props.link.text}</a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

