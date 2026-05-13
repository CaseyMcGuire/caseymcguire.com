import * as stylex from "@stylexjs/stylex";
import {graphql, useFragment} from "react-relay";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import AiChatMessage from "apps/AiChat/components/AiChatMessage";

// Must match the @connection(key: ...) value below; Relay reads that literal at compile time.
export const AI_CHAT_MESSAGES_CONNECTION_KEY = "AiChatMessageList_messages"

type Props = {
  query: AiChatMessageList_query$key,
}

const styles = stylex.create({
})

export default function AiChatMessageList(props: Props) {
  const data = useFragment(
    graphql`
      fragment AiChatMessageList_query on Query
      @argumentDefinitions(
        conversationId: { type: "ID!" }
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String" }
      )
      {
        aiConversation(id: $conversationId) {
          id
          messages(first: $first, after: $after) @connection(key: "AiChatMessageList_messages") {
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