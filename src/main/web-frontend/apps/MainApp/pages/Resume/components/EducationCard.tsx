import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  educationCardContainer: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  schoolInfoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  universityName: {
    fontWeight: "bold",
  },
  graduationDate: {
    fontStyle: "italic",
  },
});

interface Props {
  universityName: string;
  major: string;
  minor?: string;
  graduationDate: string;
}

export default function EducationCard(props: Props) {
  const { universityName, major, minor, graduationDate } = props;

  return (
    <div {...stylex.props(styles.educationCardContainer)}>
      <div {...stylex.props(styles.schoolInfoContainer)}>
        <div>
          <span {...stylex.props(styles.universityName)}>
            {universityName}
          </span>
        </div>
        <div>
          <span>{major}</span>
        </div>
        <div>
          <span>{minor}</span>
        </div>
      </div>
      <div>
        <span {...stylex.props(styles.graduationDate)}>
          Graduated {graduationDate}
        </span>
      </div>
    </div>
  );
}
