import {TableOfContentsNode} from "utils/MarkdownUtils";
import * as stylex from '@stylexjs/stylex';

type Props = {
  headings: TableOfContentsNode[]
}

const styles = stylex.create({
  container: {
    marginLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: 0,
    position: 'sticky',
  },
  body: {
    marginTop: 8,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: "rgb(229, 231, 235)",
    minHeight: 64,
    width: 256
  },
  level: {
    paddingLeft: 8,
    listStyle: 'none',
  },
  levelBlock: {
    margin: 4
  },
  link: {
    textDecoration: 'none',
  },
  linkContents: {
    color: 'rgb(82, 88, 96)',
    ':hover': {
      color: 'rgb(53, 120, 229)',
    }
  },
  header: {
    marginLeft: 12
  }
})

export default function WikiTableOfContents(props: Props) {

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.body)}>
        <h4 {...stylex.props(styles.header)} >Table of Contents</h4>
        <WikiTableOfContentsItem nodes={props.headings}/>
      </div>
    </div>
  );
}

function WikiTableOfContentsItem(props: {
  nodes: TableOfContentsNode[]
}) {
  if (props.nodes.length === 0) {
    return null;
  }
  return (
    <ul {...stylex.props(styles.level)}>
      {
        props.nodes.map(node => {
          return (
            <li
              {...stylex.props(styles.levelBlock)}
              key={node.id}>
              <a
                {...stylex.props(styles.link)}
                href={`#${node.id}`}>
                <span {...stylex.props(styles.linkContents)}>
                  {node.text}
                </span>
              </a>
              <WikiTableOfContentsItem nodes={node.children}/>
            </li>
          )
          }
        )
      }
    </ul>
  )

}