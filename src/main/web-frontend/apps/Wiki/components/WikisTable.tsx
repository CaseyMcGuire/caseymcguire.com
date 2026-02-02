import {graphql, useRefetchableFragment} from "react-relay";
import {WikisTable_wikis$key} from "__generated__/relay/WikisTable_wikis.graphql";
import * as stylex from "@stylexjs/stylex";
import {Link} from "react-router";

type Props = {
  wikis: WikisTable_wikis$key
}

const styles = stylex.create({
  tableRow: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(229, 231, 235)',
  }
});
export default function WikisTable(props: Props) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment WikisTable_wikis on Query 
      @refetchable(queryName: "WikisTableQuery")
      {
        wikis {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
    props.wikis
  )

  return (
    <table>
      <thead>
      <tr>
        <th>Wiki Name</th>
      </tr>
      </thead>
      <tbody>
      {
        data?.wikis?.edges?.map(edge => {
          return (
            <tr {...stylex.props(styles.tableRow)}>
              <td>
                <Link to={`/wiki/${encodeURIComponent(edge?.node?.name)}`}>{edge?.node?.name}</Link>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}