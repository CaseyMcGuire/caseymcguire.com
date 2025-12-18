import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {WikiSidebarPage_wikiPage$key} from "__generated__/relay/WikiSidebarPage_wikiPage.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";

type Props = {
  wikiPage: WikiSidebarPage_wikiPage$key | null | undefined;
}

const styles = stylex.create({
  item: {
    paddingBlock: WikiStyles.sidebarMenuPaddingBlock,
    paddingInline: WikiStyles.sidebarMenuPaddingInline
  }
})

export default function WikiSidebarPage(props: Props) {
  const data = useFragment(
    graphql`
      fragment WikiSidebarPage_wikiPage on WikiPage {
        name
      }
    `,
    props.wikiPage
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