import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import {Navigate, useParams} from "react-router";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiIndexPageQuery} from "__generated__/relay/WikiIndexPageQuery.graphql";
import WikiPageLayout from "apps/Wiki/components/WikiPageLayout";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  }
})

export default function WikiIndexPage() {
  const query = graphql`
    query WikiIndexPageQuery(
      $wikiName: String!
    ) {
      wiki: wikiByName(name: $wikiName) {
        id
        name
        ...WikiSidebar_wiki
      }
    }
  `
  const {wikiName} = useParams<{ wikiName: string}>();
  if (!wikiName) {
    return <Navigate to={`/wiki`} replace />
  }
  const data = useLazyLoadQuery<WikiIndexPageQuery>(
    query,
    {
      wikiName
    }
  )


  return (
    <WikiPageLayout wikiName={wikiName} wikiId={data.wiki!.id} wiki={data.wiki}>
      <div {...stylex.props(styles.container)}>{wikiName}</div>
    </WikiPageLayout>
  );
}