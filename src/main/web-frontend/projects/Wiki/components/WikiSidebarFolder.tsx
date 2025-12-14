import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {WikiSidebarFolder_wikiFolder$key} from "__generated__/relay/WikiSidebarFolder_wikiFolder.graphql";
import WikiSidebarPage from "projects/Wiki/components/WikiSidebarPage";
import NestedWikiSidebarFolder from "projects/Wiki/components/NestedWikiSidebarFolder";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "projects/Wiki/components/WikiStyles.stylex";

type Props = {
  wikiFolder: WikiSidebarFolder_wikiFolder$key | null | undefined;
}

const styles = stylex.create({
  item: {
    paddingLeft: 12,
  }
})

export default function WikiSidebarFolder(props: Props) {
  const data = useFragment(
    graphql`
      fragment WikiSidebarFolder_wikiFolder on WikiFolder {
        name
        children {
          __typename
          ...WikiSidebarPage_wikiPage
          ...NestedWikiSidebarFolder_wikiFolder
        }
      }
    `,
    props.wikiFolder
  )

  if (data == null) {
    return null
  }

  return (
    <div {...stylex.props(styles.item)}>
      <div>
        {data.name}
      </div>
      {
        data?.children.map(item => {
          switch (item.__typename) {
            case "WikiPage":
              return <WikiSidebarPage wikiPage={item} />
            case "WikiFolder":
              return <NestedWikiSidebarFolder wikiFolder={item} />
            default:
              return null;
          }
        })
      }
    </div>
  )
}