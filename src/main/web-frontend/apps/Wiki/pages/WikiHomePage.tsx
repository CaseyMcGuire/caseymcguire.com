import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import * as stylex from "@stylexjs/stylex";
import {graphql} from "react-relay";
import WikisTable from "apps/Wiki/components/WikisTable";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiHomePageQuery} from "__generated__/relay/WikiHomePageQuery.graphql";

const styles = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});

export default function WikiHomePage() {
  const data = useLazyLoadQuery<WikiHomePageQuery>(
    graphql`
      query WikiHomePageQuery {
        ...WikisTable_wikis
      }
    `,
    {}
  );

  return (
    <WikiPageWrapper wikiName={"Home"}>
      <div {...stylex.props(styles.container)}>
        <WikisTable wikis={data} />
      </div>
    </WikiPageWrapper>
  )
}