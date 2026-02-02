import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {ViewWikiPageQuery} from "__generated__/relay/ViewWikiPageQuery.graphql";
import WikiPageContent from "apps/Wiki/components/WikiPageContent";
import {Navigate, useParams} from "react-router";
import WikiPageLayout from "apps/Wiki/components/WikiPageLayout";

export default function ViewWikiPage() {
  const query = graphql`
    query ViewWikiPageQuery(
      $wikiId: ID!,
      $wikiPageId: ID!
    ) {
      wiki: wikiById(id: $wikiId) {
        id
        name
        ...WikiSidebar_wiki
      }
      wikiPageById(id: $wikiPageId) {
        ...WikiPageContent_page
      }
    }
  `

  const {pageId, wikiId} = useParams<{ wikiId: string, pageId: string }>();
  if (!pageId) {
    return <Navigate to={`/wiki/${wikiId}`} replace />
  }
  if (!wikiId) {
    return (
      <Navigate to={`/wiki`} replace />
    )
  }

  const data = useLazyLoadQuery<ViewWikiPageQuery>(
    query,
    {
      wikiId,
      wikiPageId: pageId
    }
  )

  const wikiName = data.wiki?.name;
  if (!wikiName) {
    return (
      <Navigate to={`/wiki`} replace />
    )
  }

  return (
    <WikiPageLayout wikiName={wikiName} wikiId={data.wiki!.id} wiki={data.wiki}>
      <WikiPageContent pageId={pageId} wikiId={wikiId} wikiPage={data.wikiPageById}/>
    </WikiPageLayout>
  );
}
