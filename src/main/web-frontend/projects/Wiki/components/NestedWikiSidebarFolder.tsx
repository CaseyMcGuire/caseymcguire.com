import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {NestedWikiSidebarFolder_wikiFolder$key} from "__generated__/relay/NestedWikiSidebarFolder_wikiFolder.graphql";
import * as stylex from "@stylexjs/stylex";


type Props = {
  wikiFolder: NestedWikiSidebarFolder_wikiFolder$key | null | undefined;
}

const styles = stylex.create({
  item: {
    paddingBlock: 6,
    paddingInline: 12
  }
})

export default function NestedWikiSidebarFolder(props: Props) {
  const data = useFragment(
    graphql`
      fragment NestedWikiSidebarFolder_wikiFolder on WikiFolder {
        name
        children {
          ...WikiSidebarPage_wikiPage
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
      {data.name}
    </div>
  )
}