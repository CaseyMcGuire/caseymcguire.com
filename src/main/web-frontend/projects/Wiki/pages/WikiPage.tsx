import {graphql} from "react-relay";
import WikiSidebar from "projects/Wiki/components/WikiSidebar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiPageQuery} from "__generated__/relay/WikiPageQuery.graphql";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({

})

export default function WikiPage() {
  const query = graphql`
    query WikiPageQuery(
      $wikiName: String!
    ) {
      wiki: wikiByName(name: $wikiName) {
        ...WikiSidebar_wiki
      }
    }
  `


  const data = useLazyLoadQuery<WikiPageQuery>(
    query,
    {
      wikiName: "Wiki"
    }
  )

  return (
    <div>
      <WikiSidebar wiki={data.wiki} />
    </div>
  )
}