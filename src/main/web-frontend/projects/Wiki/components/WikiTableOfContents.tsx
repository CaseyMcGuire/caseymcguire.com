import {TableOfContentsNode} from "utils/MarkdownUtils";
import * as stylex from '@stylexjs/stylex';

type Props = {
  headings: TableOfContentsNode[]
}

const styles = stylex.create({
  container: {
    marginTop: 8,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: "rgb(229, 231, 235)",
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
  }
})

export default function WikiTableOfContents(props: Props) {

  return (
    <div>
      <div {...stylex.props(styles.container)}>
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