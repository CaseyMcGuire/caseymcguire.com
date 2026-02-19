import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {ViewWikiPageQuery} from "__generated__/relay/ViewWikiPageQuery.graphql";
import WikiPageContent from "apps/Wiki/components/WikiPageContent";
import {Navigate, useParams} from "react-router";
import WikiPageLayout from "apps/Wiki/components/WikiPageLayout";
import {useEffect} from "react";

export default function ViewWikiPage() {
  const query = graphql`
    query ViewWikiPageQuery(
      $wikiId: ID!,
      $wikiPageId: ID!
    ) {
      wiki: wikiById(id: $wikiId) {
        id
        name
        ...WikiSidebarFragment_wiki
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

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "instant"});
  }, [pageId]);

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
    <WikiPageLayout
      wikiName={wikiName}
      wikiId={data.wiki!.id}
      wiki={data.wiki}
      currentPageId={pageId}
    >
      <WikiPageContent pageId={pageId} wikiId={wikiId} wikiPage={data.wikiPageById}/>
    </WikiPageLayout>
  );
}
