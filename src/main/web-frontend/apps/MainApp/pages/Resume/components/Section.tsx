import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  sectionContainer: {
    marginBottom: 10,
  },
  sectionContentContainer: {
    padding: "0px 20px",
  },
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "black",
  },
  sectionTitle: {
    fontWeight: "bold",
  },
});

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section(props: Props) {
  return (
    <div sx={styles.sectionContainer}>
      <div sx={styles.sectionTitleContainer}>
        <span sx={styles.sectionTitle}>{props.title}</span>
      </div>
      <div sx={styles.sectionContentContainer}>
        {props.children}
      </div>
    </div>
  );
}
