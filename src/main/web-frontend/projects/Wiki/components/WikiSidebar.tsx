import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {WikiSidebar_wiki$key} from "__generated__/relay/WikiSidebar_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";
import WikiSidebarPage from "projects/Wiki/components/WikiSidebarPage";
import WikiSidebarFolder from "projects/Wiki/components/WikiSidebarFolder";

type Props = {
  wiki: WikiSidebar_wiki$key | null | undefined;
}

const styles = stylex.create({
  body: {
    width: WikiStyles.sidebarWidth,
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
        sidebar {
          __typename
          ...WikiSidebarPage_wikiPage
          ...WikiSidebarFolder_wikiFolder
        }
      }
    `,
    props.wiki
  )


  return (
    <div {...stylex.props(styles.body)}>
      <div>Wiki Sidebar</div>
      {
        data?.sidebar?.map(item => {
          switch (item.__typename) {
            case "WikiPage":
              return <WikiSidebarPage wikiPage={item} />
            case "WikiFolder":
              return <WikiSidebarFolder wikiFolder={item} />
            default:
              return null;
          }
        })
      }
    </div>
  );
}

function WikiPageSidebarItem(props: {name: string}) {
  return (
    <div>
      {props.name}
    </div>
  )
}
