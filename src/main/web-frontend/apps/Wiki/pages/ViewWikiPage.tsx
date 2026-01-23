import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {ViewWikiPageQuery} from "__generated__/relay/ViewWikiPageQuery.graphql";
import WikiPageContent from "apps/Wiki/components/WikiPageContent";
import {Navigate, useParams} from "react-router";
import WikiPageLayout from "apps/Wiki/components/WikiPageLayout";

export default function ViewWikiPage() {
  const query = graphql`
    query ViewWikiPageQuery(
      $wikiName: String!,
      $wikiPageId: ID!
    ) {
      wiki: wikiByName(name: $wikiName) {
        id
        name
        ...WikiSidebar_wiki
      }
      wikiPageById(id: $wikiPageId) {
        ...WikiPageContent_page
      }
    }
  `

  const {pageId, wikiName} = useParams<{ wikiName: string, pageId: string }>();
  if (!pageId) {
    return <Navigate to={`/wiki/${wikiName}`} replace />
  }
  if (!wikiName) {
    return (
      <Navigate to={`/wiki`} replace />
    )
  }

  const data = useLazyLoadQuery<ViewWikiPageQuery>(
    query,
    {
      wikiName,
      wikiPageId: pageId
    }
  )

  return (
    <WikiPageLayout wikiName={wikiName} wikiId={data.wiki!.id} wiki={data.wiki}>
      <WikiPageContent pageId={pageId} wikiName={wikiName} wikiPage={data.wikiPageById}/>
    </WikiPageLayout>
  );
}