import * as React from "react";
import Page from "../Page/Page";
import { Link } from "react-router";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px #CCCCCC solid',
    width: '100%',
    padding: '12px',
    borderRadius: '16px',
    marginBottom: '16px'
  },
  cardImage: {
    height: 'auto',
    maxWidth: '100px'
  },
  title: {
    marginBottom: '12px'
  },
  description: {
    marginBottom: '12px'
  }
})

export default function ProjectsPage() {
  const styles = useStyles();
  return (
   <Page>
     <div className={styles.cardContainer}>
       <ProjectCard imgUrl={"foo"}
                    title={"Personal Website"}
                    description={"This is the source code for this website. It's written using Spring Boot and Kotlin on the backend, and TypeScript and React on the frontend. "}
                    link={"https://github.com/CaseyMcGuire/caseymcguire.com"}
                    />

       <ProjectCard imgUrl={"/assets/images/tetris.png"}
                    title={"Tetris"}
                    description={"The game of tetris implemented using React"}
                    link={"/tetris"}
       />
     </div>
   </Page>
  )
}

type CardProps = {
  imgUrl: string,
  title: string,
  description: string,
  link: string,
}

function ProjectCard(props: CardProps) {
  const styles = useStyles();
  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.title}>
          {props.title}
        </h2>
        <div className={styles.description}>
          {props.description}
        </div>
        <Link to={props.link}>View</Link>
      </div>
    </div>
  )
}
