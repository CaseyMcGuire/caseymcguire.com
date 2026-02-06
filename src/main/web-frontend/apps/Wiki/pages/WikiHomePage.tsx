import WikiPageWrapper from "apps/Wiki/components/WikiPageWrapper";
import * as stylex from "@stylexjs/stylex";
import {graphql} from "react-relay";
import WikisTable from "apps/Wiki/components/WikisTable";
import {useLazyLoadQuery} from "react-relay/hooks";
import {WikiHomePageQuery} from "__generated__/relay/WikiHomePageQuery.graphql";
import Button from "components/buttons/Button";
import {useNavigate} from "react-router";
import AdminComponentGating from "components/gating/AdminComponentGating";

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    marginTop: 64,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12
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

  const navigate = useNavigate();

  return (
    <WikiPageWrapper wikiName={"Home"}>
      <div {...stylex.props(styles.container)}>
        <div>
          <AdminComponentGating>
            <div {...stylex.props(styles.buttonContainer)}>
              <Button text={"Create Wiki"} onClick={() => {
                navigate('/wiki/new')
              }}/>
            </div>
          </AdminComponentGating>
          <WikisTable wikis={data}/>
        </div>
      </div>
    </WikiPageWrapper>
  )
}