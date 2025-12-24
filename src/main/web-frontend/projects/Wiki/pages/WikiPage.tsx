import {graphql} from "react-relay";
import WikiSidebar from "projects/Wiki/components/WikiSidebar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiPageQuery} from "__generated__/relay/WikiPageQuery.graphql";
import WikiPageContent from "projects/Wiki/components/WikiPageContent";
import {useLocation, useParams} from "react-router";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  }
})

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

  // this is brittle. Figure out a typesafe way to keep defined route and params in sync.
  const { pageId } = useParams<{ pageId: string }>();


  const data = useLazyLoadQuery<WikiPageQuery>(
    query,
    {
      wikiName: "Wiki",
      wikiPageId: pageId,
      includeWikiPage: pageId != null
    }
  )

  return (
    <div {...stylex.props(styles.body)}>
      <WikiSidebar wiki={data.wiki} />
      <WikiPageContent wikiPage={data.wikiPageById} />
    </div>
  );
}