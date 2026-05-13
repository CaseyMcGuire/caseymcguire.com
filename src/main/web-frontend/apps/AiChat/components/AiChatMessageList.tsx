import * as stylex from "@stylexjs/stylex";
import {graphql, useFragment} from "react-relay";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import AiChatMessage from "apps/AiChat/components/AiChatMessage";

type Props = {
  query: AiChatMessageList_query$key,
}

const styles = stylex.create({
})

export default function AiChatMessageList(props: Props) {
  const data = useFragment(
    graphql`
      fragment AiChatMessageList_query on Query
      @argumentDefinitions(conversationId: { type: "ID!" })
      {
        aiConversation(id: $conversationId) {
          id
          messages {
            edges {
              node {
                id
                ...AiChatMessage_message
              }
            }
          }
        }
      }
    `,
    props.query
  )

  return (
    <div>
      {
        data.aiConversation?.messages?.edges?.map(edge => (
          edge?.node ? <AiChatMessage key={edge.node.id} message={edge.node} /> : null
        ))
      }
    </div>
  )
}