import {graphql} from "react-relay";
import WikiSidebar from "projects/Wiki/components/WikiSidebar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiPageQuery} from "__generated__/relay/WikiPageQuery.graphql";

export default function WikiPage() {
  const query = graphql`
    query WikiPageQuery(
      $wikiName: String!
    ) {
      wiki: wikiByName(name: $wikiName) {
        id
        name
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

  return <WikiSidebar wiki={data.wiki} />;
}