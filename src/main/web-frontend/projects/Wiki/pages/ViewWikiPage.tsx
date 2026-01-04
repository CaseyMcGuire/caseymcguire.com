import {graphql} from "react-relay";
import WikiSidebar from "projects/Wiki/components/WikiSidebar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {ViewWikiPageQuery} from "__generated__/relay/ViewWikiPageQuery.graphql";
import WikiPageContent from "projects/Wiki/components/WikiPageContent";
import {useParams} from "react-router";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  }
})

export default function ViewWikiPage() {
  const query = graphql`
    query ViewWikiPageQuery(
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

  // this is brittle. Figure out a typesafe way to keep defined route and params in sync.
  const { pageId, wikiName } = useParams<{wikiName: string, pageId: string }>();


  const data = useLazyLoadQuery<ViewWikiPageQuery>(
    query,
    {
      wikiName: wikiName!,
      wikiPageId: pageId,
      includeWikiPage: pageId != null
    }
  )

  return (
    <div {...stylex.props(styles.body)}>
      <WikiSidebar wikiId={data.wiki!.id} wiki={data.wiki} />
      <WikiPageContent pageId={pageId!} wikiName={wikiName!} wikiPage={data.wikiPageById} />
    </div>
  );
}