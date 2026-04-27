import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  technologyInfoCardContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },
  technologyInfoCardTitle: {
    fontWeight: "bold",
  },
  technologySectionContainer: {
    display: "flex",
    flexDirection: "row",

    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  technologySectionTitleContainer: {
    flex: 1,

    "@media (max-width: 600px)": {
      margin: "3px 0px",
    },
  },
  technologySectionContentContainer: {
    flex: 2,
  },
});

interface Props {
  programmingLanguages: string[];
  technologiesAndTools: string[];
}

export default function TechnologyInfoCard(props: Props) {
  return (
    <div sx={styles.technologyInfoCardContainer}>
      <TechnologySection
        title="Programming Languages"
        elements={props.programmingLanguages}
      />
      <TechnologySection
        title="Technologies & Tools"
        elements={props.technologiesAndTools}
      />
    </div>
  );
}

function TechnologySection(props: { title: string; elements: string[] }) {
  return (
    <div sx={styles.technologySectionContainer}>
      <div sx={styles.technologySectionTitleContainer}>
        <span sx={styles.technologyInfoCardTitle}>
          {props.title}:
        </span>
      </div>
      <div sx={styles.technologySectionContentContainer}>
        {formatElements(props.elements)}
      </div>
    </div>
  );
}

function formatElements(elements: string[]): string {
  if (elements.length === 1) {
    return elements[0];
  }
  let mergedElements = "";
  for (let i = 0; i < elements.length; i++) {
    if (i === elements.length - 1) {
      mergedElements += "and " + elements[i];
    } else {
      mergedElements += elements[i] + ", ";
    }
  }
  return mergedElements;
}
