import {graphql} from "react-relay";
import WikiSidebar from "projects/Wiki/components/WikiSidebar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiPageQuery} from "__generated__/relay/WikiPageQuery.graphql";
import WikiPageContent from "projects/Wiki/components/WikiPageContent";
import {useLocation} from "react-router";

export default function WikiPage() {
  const query = graphql`
    query WikiPageQuery(
      $wikiName: String!,
      $wikiPageId: ID,
      $includeWikiPage: Boolean!
    ) {
      wiki: wikiByName(name: $wikiName) {
        id
        name
        ...WikiSidebar_wiki
      }
      wikiPageById(id: $wikiPageId) @include(if: $includeWikiPage) {
        ...WikiPageContent_page
      }
    }
  `

  const getWikiPageId = (): string | null | undefined => {
    const { pathname } = useLocation();
    const pathComponents = pathname.split("/");
    return pathComponents.at(-1)
  }

  const wikiPageId = getWikiPageId();


  const data = useLazyLoadQuery<WikiPageQuery>(
    query,
    {
      wikiName: "Wiki",
      wikiPageId,
      includeWikiPage: wikiPageId != null
    }
  )

  return (
    <div>
      <WikiSidebar wiki={data.wiki} />
      {
         <WikiPageContent wikiPage={data.wikiPageById} />
      }

    </div>
  );
}