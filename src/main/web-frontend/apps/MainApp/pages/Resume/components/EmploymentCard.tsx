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
    <div {...stylex.props(styles.employmentCardContainer)}>
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.companyEmploymentDateContainer)}>
          <div>
            <span {...stylex.props(styles.title)}>{title}</span>
          </div>
          <div>
            <span>{employmentDate}</span>
          </div>
        </div>
        <div {...stylex.props(styles.companyNameLocationContainer)}>
          <div>
            <span {...stylex.props(styles.companyName)}>{companyName}</span>
          </div>
          <div {...stylex.props(styles.locationContainer)}>
            <span {...stylex.props(styles.location)}>{location}</span>
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

