import {TableOfContentsNode} from "utils/MarkdownUtils";
import * as stylex from '@stylexjs/stylex';
import {useScrollSpy} from "hooks/ScrollSpyHook";
import {useMemo} from "react";
import {WikiStyles} from "./WikiStyles.stylex";

type Props = {
  headings: TableOfContentsNode[]
}

const styles = stylex.create({
  container: {
    marginTop: 40,
    marginLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: WikiStyles.tableOfContentsTop,
    position: 'sticky',
    '@media (max-width: 1300px)': {
      display: 'none'
    }
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
  },
  activeLinkContents: {
    color: 'rgb(53, 120, 229)',
  }
})

export default function WikiPageTableOfContents(props: Props) {
  const allIds = useMemo(() => {
    const ids: string[] = [];
    const traverse = (nodes: TableOfContentsNode[]) => {
      nodes.forEach((node) => {
        ids.push(node.id);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(props.headings);
    return ids;
  }, [props.headings]);

  const activeId = useScrollSpy(allIds);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.body)}>
        <h4 {...stylex.props(styles.header)}>Table of Contents</h4>
        <WikiTableOfContentsItem activeId={activeId} nodes={props.headings}/>
      </div>
    </div>
  );
}

function WikiTableOfContentsItem(props: {
  nodes: TableOfContentsNode[],
  activeId: string
}) {
  if (props.nodes.length === 0) {
    return null;
  }
  return (
    <ul {...stylex.props(styles.level)}>
      {
        props.nodes.map(node => {
          const isActive = node.id === props.activeId;
            return (
              <li
                {...stylex.props(styles.levelBlock)}
                key={node.id}>
                <a
                  {...stylex.props(styles.link)}
                  href={`#${node.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(node.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                <span {...stylex.props(!isActive && styles.linkContents, isActive && styles.activeLinkContents)}>
                  {node.text}
                </span>
                </a>
                <WikiTableOfContentsItem activeId={props.activeId} nodes={node.children}/>
              </li>
            )
          }
        )
      }
    </ul>
  )

}