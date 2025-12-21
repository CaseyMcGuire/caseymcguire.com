import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {WikiSidebar_wiki$data, WikiSidebar_wiki$key} from "__generated__/relay/WikiSidebar_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiSidebarFolder, WikiSidebarItem} from "projects/Wiki/models/WikiModels";
import WikiSidebarItemComponent from "projects/Wiki/components/WikiSidebarItemComponent";


type Props = {
  wiki: WikiSidebar_wiki$key | null | undefined;
}

const styles = stylex.create({
  body: {
    width: '256px',
    height: '100%',
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "rgb(229, 231, 235)",
    position: "fixed",
    overflowY: "scroll",
  }
})

export default function WikiSidebar(
  props: Props
) {

  const data = useFragment(
    graphql`
      fragment WikiSidebar_wiki on Wiki {
        rootFolder {
          id
          name
          children {
            __typename
            ... on WikiFolder {
              id
              name
              children {
                __typename
                ... on WikiFolder {
                  id
                  name
                  # We only allow two levels of nesting 
                  children {
                    ... on WikiPage {
                      id
                      name
                    }
                  }
                }
                ... on WikiPage {
                  id
                  name
                }
              }
            }
            ... on WikiPage {
              id
              name
            }
          }
        }
      }
    `,
    props.wiki
  )

  if (data == null) {
    return null;
  }

  const rootFolder = createWikiSidebar(data);

  if (rootFolder == null) {
    return null;
  }

  return (
    <div {...stylex.props(styles.body)}>
      <div>Wiki Sidebar</div>
      {
        rootFolder.children.map(child => {
          return <WikiSidebarItemComponent key={child.id} item={child} />
        })
      }
    </div>
  );
}

function createWikiSidebar(data: WikiSidebar_wiki$data): WikiSidebarFolder | null {
  const rootFolder = data.rootFolder;
  const rootChildren: Array<WikiSidebarItem> = [];
  rootFolder?.children?.forEach(child => {
    if (child.__typename === "WikiPage") {
      const rootId = child.id;
      const rootName = child.name;

      if (rootId == null || rootName == null) {
        return;
      }

      rootChildren.push({
        type: "WikiSidebarPage",
        id: rootId,
        name: rootName
      })
    }
    else if (child.__typename === "WikiFolder") {
      const rootId = child.id;
      const rootName = child.name;

      if (rootId == null || rootName == null) {
        return;
      }

      const folderChildren: Array<WikiSidebarItem> = []
      child.children?.forEach(nestedChild => {
        if (nestedChild.__typename === "WikiPage") {
          const nestedChildId = nestedChild.id;
          const nestedChildName = nestedChild.name;

          if (nestedChildId == null || nestedChildName == null) {
            return;
          }

          folderChildren.push({
            type: "WikiSidebarPage",
            id: nestedChildId,
            name: nestedChildName
          })

        }
        else if (nestedChild.__typename === "WikiFolder") {
          const nestedChildId = nestedChild.id;
          const nestedChildName = nestedChild.name;
          if (nestedChildId == null || nestedChildName == null) {
            return;
          }

          const grandChildPages: Array<WikiSidebarItem> = [];
          nestedChild.children?.forEach(grandChildPage => {
            const grandChildId = grandChildPage.id;
            const grandChildName = grandChildPage.name;
            if (grandChildId == null || grandChildName == null) {
              return;
            }

            grandChildPages.push({
              id: grandChildId,
              name: grandChildName,
              type: "WikiSidebarPage"
            })
          });

          folderChildren.push(
            {
              type: "WikiSidebarFolder",
              id: nestedChildId,
              name: nestedChildName,
              children: grandChildPages
            }
          )
        }
      })

      rootChildren.push({
        type: "WikiSidebarFolder",
        id: rootId,
        name: rootName,
        children: folderChildren
      })
    }

  });

  const id = data.rootFolder?.id;
  const name = data.rootFolder?.name;

  if (id == null || name == null) {
    return null;
  }

  return {
    type: "WikiSidebarFolder",
    id,
    name,
    children: rootChildren
  }
}

