import {graphql} from "react-relay";
import {useFragment} from "react-relay/hooks";
import {WikiPageContent_page$key} from "__generated__/relay/WikiPageContent_page.graphql";
import {props} from "@stylexjs/stylex";

type Props = {
  wikiPage?: WikiPageContent_page$key | null
}

export default function WikiPageContent(props: Props) {
  const data = useFragment(
    graphql`
      fragment WikiPageContent_page on GqlWikiPage {
        content
      }
    `,
    props.wikiPage
  )

  return (
    <div>
      {data?.content}
    </div>
  );
}