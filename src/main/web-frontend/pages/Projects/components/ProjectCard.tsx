import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import ProjectCardLink from "pages/Projects/components/ProjectCardLink";

const styles = stylex.create({
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
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkContainer: {
    marginRight: '8px'
  }
})

type CardProps = {
  title: string,
  description: string,
  sourceHref: string,
  href: string,
}

export default function ProjectCard(props: CardProps) {
  return (
    <div {...stylex.props(styles.card)}>
      <div>
        <h2 {...stylex.props(styles.title)}>
          {props.title}
        </h2>
        <div {...stylex.props(styles.description)}>
          {props.description}
        </div>
      </div>
      <div {...stylex.props(styles.linksContainer)}>
        <div {...stylex.props(styles.linkContainer)}>
          <ProjectCardLink to={props.href} text={"View"} />
        </div>
        <div>
          <ProjectCardLink to={props.sourceHref} text={"Source"} />
        </div>
      </div>
    </div>
  );
}

