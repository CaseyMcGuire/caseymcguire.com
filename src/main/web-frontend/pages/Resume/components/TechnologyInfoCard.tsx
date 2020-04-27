import * as React from "react";
import {createUseStyles} from "react-jss";

const getStyles = createUseStyles({
  technologyInfoCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5px'
  },
  technologyInfoCardTitle: {
    fontWeight: 'bold'
  },
  technologySectionContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  technologySectionTitleContainer: {
    flex: 1
  },
  technologySectionContentContainer: {
    flex: 2
  },
  '@media only screen and (max-width: 600px)': {
    technologySectionContainer: {
      flexDirection: 'column'
    },
    technologySectionTitleContainer: {
      margin: '3px 0px'
    }
  }
});

interface Props {
  programmingLanguages: string[],
  technologiesAndTools: string[]
}

export default function TechnologyInfoCard(props: Props) {
  const styles = getStyles()
  return (
    <div className={styles.technologyInfoCardContainer}>
      <TechnologySection title={"Programming Languages"} elements={props.programmingLanguages}/>
      <TechnologySection title={"Technologies & Tools"} elements={props.technologiesAndTools}/>
    </div>
  )
}


function TechnologySection(props: { title: string, elements: string[] }) {
  const styles = getStyles()
  return (
    <div className={styles.technologySectionContainer}>
      <div className={styles.technologySectionTitleContainer}>
        <span className={styles.technologyInfoCardTitle}>{props.title}:</span>
      </div>
      <div className={styles.technologySectionContentContainer}>
        {formatElements(props.elements)}
      </div>
    </div>
  )
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