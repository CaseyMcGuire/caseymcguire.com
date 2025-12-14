import {useFragment} from "react-relay/hooks";
import {graphql} from "react-relay";
import {WikiSidebarPage_wikiPage$key} from "__generated__/relay/WikiSidebarPage_wikiPage.graphql";

type Props = {
  wikiPage: WikiSidebarPage_wikiPage$key | null | undefined;
}

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
    <div>{data.name}</div>
  )
}