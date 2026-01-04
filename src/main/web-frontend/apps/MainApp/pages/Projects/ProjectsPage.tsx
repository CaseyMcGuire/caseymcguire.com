import Page from "apps/MainApp/components/Page";
import ProjectCard from "apps/MainApp/pages/Projects/components/ProjectCard";
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center'
  }
})

export default function ProjectsPage() {
  return (
    <Page>
      <div {...stylex.props(styles.cardContainer)}>
        <ProjectCard title={"Personal Website"}
                     description={"This is the source code for this website. It's written using Spring Boot and Kotlin on the backend, and TypeScript and React on the frontend. "}
                     sourceHref={"https://github.com/CaseyMcGuire/caseymcguire.com"}
                     href={"/"}
        />

        <ProjectCard title={"Tetris"}
                     description={"The game of tetris implemented using React"}
                     sourceHref={"https://github.com/CaseyMcGuire/caseymcguire.com/tree/8cbc5094cd115cc65681e14f3058efaa007f80f8/src/main/web-frontend/pages/Tetris"}
                     href={"/tetris"}
        />
      </div>
    </Page>
  )
}

