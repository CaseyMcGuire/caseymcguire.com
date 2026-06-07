import * as stylex from "@stylexjs/stylex";
import AiChatNewChatButton from "apps/AiChat/components/AiChatNewChatButton";
import {graphql, usePaginationFragment} from "react-relay";
import {AiChatSidebar_query$key} from "__generated__/relay/AiChatSidebar_query.graphql";
import {AiChatSidebarPaginationQuery} from "__generated__/relay/AiChatSidebarPaginationQuery.graphql";
import {AIChatRoutes} from "__generated__/routes/AIChatRoutes";
import {useNavigate} from "react-router";

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  content: {

  },
  titleContainer: {
    paddingVertical: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bolder',
  },
  chat: {
    paddingVertical: 8,
    cursor: 'pointer',
    color: '#525252',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',
    overflow: 'hidden'
  },
  loadMore: {
    marginTop: 8,
    cursor: 'pointer',
  },
})

type Props = {
  query: AiChatSidebar_query$key,
}

export default function AiChatSidebar(props: Props) {
  const navigate = useNavigate()
  const {data, loadNext, hasNext, isLoadingNext} = usePaginationFragment<
    AiChatSidebarPaginationQuery,
    AiChatSidebar_query$key
  >(
    graphql`
      fragment AiChatSidebar_query on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
      )
      @refetchable(queryName: "AiChatSidebarPaginationQuery") {
        aiConversations(first: $first, after: $after)
        @connection(key: "AiChatSidebar_aiConversations") {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
    props.query
  )

  const edges = data.aiConversations?.edges ?? []

  return (
    <div sx={styles.container}>
      <div sx={styles.content}>
        <div sx={styles.titleContainer}>
          <span sx={styles.title}>AI Chat</span>
        </div>
        <div>
          {edges.map(edge => (
            <div
              key={edge?.node?.id}
              sx={styles.chat}
              onClick={() => {
                if (edge?.node?.id) {
                  navigate(AIChatRoutes.ViewChat({ conversationId: edge.node.id }))
                }
              }}
            >
              {edge?.node?.title}
            </div>
          ))}
          {hasNext && (
            <div
              sx={styles.loadMore}
              onClick={() => {
                if (!isLoadingNext) {
                  loadNext(20)
                }
              }}
            >
              {isLoadingNext ? "Loading…" : "Load more"}
            </div>
          )}
        </div>
      </div>
      <AiChatNewChatButton />
    </div>
  )
}
