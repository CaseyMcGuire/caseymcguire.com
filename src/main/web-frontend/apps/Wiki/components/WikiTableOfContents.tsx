import {readInlineData} from "react-relay/hooks";
import {createWikiNavigationModel, sidebarFragment} from "apps/Wiki/components/WikiSidebarFragment";
import {WikiSidebarFragment_wiki$key} from "__generated__/relay/WikiSidebarFragment_wiki.graphql";
import {WikiSidebarFolder, WikiSidebarItem, WikiSidebarPage} from "apps/Wiki/models/WikiModels";
import {Link} from "react-router";
import * as stylex from "@stylexjs/stylex";

type Props = {
  wiki: WikiSidebarFragment_wiki$key | null | undefined;
}

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgb(249, 250, 251)',
    borderRadius: 8,
  },
  title: {
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'rgb(107, 114, 128)',
    marginBottom: 10,
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  nestedList: {
    listStyleType: 'none',
    paddingLeft: 16,
    margin: 0,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgb(229, 231, 235)',
  },
  listItem: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 1.4,
  },
  folderName: {
    fontWeight: 700,
    color: 'rgb(17, 24, 39)',
    marginBottom: 6,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  linkText: {
    color: 'rgb(107, 114, 128)',
    fontWeight: 500,
  },
});

export default function WikiTableOfContents(props: Props) {
  const data = readInlineData(
    sidebarFragment,
    props.wiki
  );

  const navigation = data ? createWikiNavigationModel(data) : null;

  if (!navigation) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.title)}>Table of Contents</div>
      <ul {...stylex.props(styles.list)}>
        {navigation.children.map(item => (
          <WikiTableOfContentsItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function WikiTableOfContentsItem({ item }: { item: WikiSidebarItem }) {
  if (item.type === "WikiSidebarPage") {
    return <WikiTableOfContentsPage page={item} />;
  }
  return <WikiTableOfContentsFolder folder={item} />;
}

function WikiTableOfContentsPage({ page }: { page: WikiSidebarPage }) {
  return (
    <li {...stylex.props(styles.listItem)}>
      <Link
        {...stylex.props(styles.link)}
        to={`/wiki/${page.wikiId}/${page.id}`}
      >
        <span {...stylex.props(styles.linkText)}>{page.name}</span>
      </Link>
    </li>
  );
}

function WikiTableOfContentsFolder({ folder }: { folder: WikiSidebarFolder }) {
  return (
    <li {...stylex.props(styles.listItem)}>
      <div {...stylex.props(styles.folderName)}>{folder.name}</div>
      {folder.children.length > 0 && (
        <ol {...stylex.props(styles.nestedList)}>
          {folder.children.map(item => (
            <WikiTableOfContentsItem key={item.id} item={item} />
          ))}
        </ol>
      )}
    </li>
  );
}
