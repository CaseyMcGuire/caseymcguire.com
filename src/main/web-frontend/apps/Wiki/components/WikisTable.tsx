import {graphql, useRefetchableFragment} from "react-relay";
import {WikisTable_wikis$key} from "__generated__/relay/WikisTable_wikis.graphql";
import * as stylex from "@stylexjs/stylex";
import {useNavigate} from "react-router";

type Props = {
  wikis: WikisTable_wikis$key
}

const styles = stylex.create({
  tableContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(229, 231, 235)',
    borderRadius: 8,
  },
  wikiName: {
    fontWeight: 'bold',
  },
  table: {
    borderCollapse: 'collapse',
  },
  cell: {
    paddingBlock: 16,
    paddingInline: 24,
  },
  nameCell: {
    width: 600,
    textAlign: 'left',
  },
  tableRow: {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: 'rgb(229, 231, 235)',
    ':hover': {
      backgroundColor: 'rgb(243, 244, 246)'
    },
    cursor: 'pointer',
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
              createdAt
            }
          }
        }
      }
    `,
    props.wikis
  )

  const navigate = useNavigate()

  return (
    <div {...stylex.props(styles.tableContainer)}>
      <table {...stylex.props(styles.table)}>
        <thead>
        <tr>
          <th {...stylex.props(styles.cell, styles.nameCell)}>Wiki Name</th>
          <th {...stylex.props(styles.cell)}>Created At</th>
        </tr>
        </thead>
        <tbody>
        {
          data?.wikis?.edges?.map(edge => {
            return (
              <tr {...stylex.props(styles.tableRow)} onClick={() => {
                navigate(`/wiki/${encodeURIComponent(edge?.node?.name)}`)
              }}>
                <td {...stylex.props(styles.cell, styles.nameCell)}>
                  <span {...stylex.props(styles.wikiName)}>{edge?.node?.name}</span>
                </td>
                <td {...stylex.props(styles.cell)}>
                  {edge?.node?.createdAt}
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}
