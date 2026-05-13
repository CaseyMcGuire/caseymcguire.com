import * as stylex from "@stylexjs/stylex";
import AiChatInput from "apps/AiChat/components/AiChatInput";
import AiChatMessageList, {AI_CHAT_MESSAGES_CONNECTION_KEY} from "apps/AiChat/components/AiChatMessageList";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import {ConnectionHandler, graphql, useMutation} from "react-relay";
import {RecordSourceSelectorProxy} from "relay-runtime";
import {AiChatConversationSendMessageMutation} from "__generated__/relay/AiChatConversationSendMessageMutation.graphql";

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  messagesContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  messages: {
    maxWidth: '700px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
  },
})

type Props = {
  conversationId?: string,
  query: AiChatMessageList_query$key | null,
}

export default function AiChatConversation(props: Props) {
  const [commitSendMessage, isInFlight] = useMutation<AiChatConversationSendMessageMutation>(
    graphql`
      mutation AiChatConversationSendMessageMutation(
        $conversationId: ID,
        $message: String!,
        $connections: [ID!]!,
      ) {
        sendMessage(conversationId: $conversationId, message: $message) {
          __typename
          ... on SuccessfulChatResponse {
            conversationId
            userMessageEdge @appendEdge(connections: $connections) {
              cursor
              node {
                id
                ...AiChatMessage_message
              }
            }
            assistantMessageEdge @appendEdge(connections: $connections) {
              cursor
              node {
                id
                ...AiChatMessage_message
              }
            }
          }
          ... on FailedChatResponse {
            errorCode
            userFacingErrorMessage
          }
        }
      }
    `
  )

  const handleSubmit = (text: string) => {
    if (isInFlight) {
      return
    }
    const connections = props.conversationId
      ? [ConnectionHandler.getConnectionID(props.conversationId, AI_CHAT_MESSAGES_CONNECTION_KEY)]
      : []
    const insertUserMessage = (store: RecordSourceSelectorProxy) => {
      if (!props.conversationId) {
        return
      }
      const connectionId = ConnectionHandler.getConnectionID(
        props.conversationId,
        AI_CHAT_MESSAGES_CONNECTION_KEY,
      )
      const connection = store.get(connectionId)
      if (!connection) {
        return
      }

      const tempId = `client:user-message:${Date.now()}`
      const messageRecord = store.create(tempId, "AiMessage")
      messageRecord.setValue(tempId, "id")
      messageRecord.setValue("USER", "role")
      messageRecord.setValue(text, "content")
      messageRecord.setValue(new Date().toISOString(), "createdAt")

      const edge = ConnectionHandler.createEdge(
        store,
        connection,
        messageRecord,
        "AiMessageEdge",
      )
      ConnectionHandler.insertEdgeAfter(connection, edge)
    }
    commitSendMessage({
      variables: {
        conversationId: props.conversationId ?? null,
        message: text,
        connections,
      },
      optimisticUpdater: insertUserMessage,
      onCompleted: (response) => {
        switch (response.sendMessage.__typename) {
          case "SuccessfulChatResponse":
            console.log("sent message in conversation:", response.sendMessage.conversationId)
            break
          case "FailedChatResponse":
            console.error(response.sendMessage.userFacingErrorMessage)
            break
        }
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <div sx={styles.container}>
      <div sx={styles.messagesContainer}>
        <div sx={styles.messages}>
          {
            props.conversationId && props.query && <AiChatMessageList query={props.query} />
          }
        </div>
      </div>
      <div sx={styles.inputContainer}>
        <AiChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  )
}