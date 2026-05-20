import * as stylex from "@stylexjs/stylex";
import AiChatInput from "apps/AiChat/components/AiChatInput";
import AiChatMessageList, {AI_CHAT_MESSAGES_CONNECTION_KEY} from "apps/AiChat/components/AiChatMessageList";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import {ConnectionHandler, graphql, requestSubscription, useRelayEnvironment} from "react-relay";
import {RecordSourceSelectorProxy, commitLocalUpdate} from "relay-runtime";
import {AiChatConversationSendMessageSubscription} from "__generated__/relay/AiChatConversationSendMessageSubscription.graphql";
import {useState} from "react";

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
  const environment = useRelayEnvironment()
  const [isInFlight, setIsInFlight] = useState(false)

  const handleSubmit = (text: string) => {
    if (isInFlight) {
      return
    }
    setIsInFlight(true)
    const connections = props.conversationId
      ? [ConnectionHandler.getConnectionID(props.conversationId, AI_CHAT_MESSAGES_CONNECTION_KEY)]
      : []

    const tempUserMessageId = `client:user-message:${Date.now()}`
    const tempAssistantMessageId = `client:assistant-message:${Date.now()}`

    // Optimistic user message — added immediately to the local store.
    if (props.conversationId) {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const connectionId = ConnectionHandler.getConnectionID(
          props.conversationId!,
          AI_CHAT_MESSAGES_CONNECTION_KEY,
        )
        const connection = store.get(connectionId)
        if (!connection) {
          return
        }

        const record = store.create(tempUserMessageId, "AiMessage")
        record.setValue(tempUserMessageId, "id")
        record.setValue("USER", "role")
        record.setValue(text, "content")
        record.setValue(new Date().toISOString(), "createdAt")

        const edge = ConnectionHandler.createEdge(store, connection, record, "AiMessageEdge")
        ConnectionHandler.insertEdgeAfter(connection, edge)
      })
    }

    requestSubscription<AiChatConversationSendMessageSubscription>(environment, {
      subscription: graphql`
        subscription AiChatConversationSendMessageSubscription(
          $conversationId: ID,
          $message: String!,
          $connections: [ID!]!,
        ) {
          sendMessage(conversationId: $conversationId, message: $message) {
            __typename
            ... on AiMessageStartedEvent {
              conversationId
            }
            ... on AiMessageChunkEvent {
              delta
            }
            ... on AiMessageCompleteEvent {
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
            ... on AiMessageErrorEvent {
              errorCode
              userFacingErrorMessage
            }
          }
        }
      `,
      variables: {
        conversationId: props.conversationId ?? null,
        message: text,
        connections,
      },
      onNext: (response) => {
        const event = response?.sendMessage
        if (event?.__typename === "AiMessageErrorEvent") {
          console.error(event.userFacingErrorMessage)
          setIsInFlight(false)
        } else if (event?.__typename === "AiMessageCompleteEvent") {
          setIsInFlight(false)
        }
      },
      onError: (error) => {
        console.error(error)
        setIsInFlight(false)
      },
      updater: (store, data) => {
        const event = data?.sendMessage
        const conversationId = props.conversationId
        if (!event || !conversationId) {
          return
        }

        const connectionId = ConnectionHandler.getConnectionID(
          conversationId,
          AI_CHAT_MESSAGES_CONNECTION_KEY,
        )
        const connection = store.get(connectionId)
        if (!connection) {
          return
        }

        switch (event.__typename) {
          case "AiMessageChunkEvent": {
            // Insert or append to a streaming-in-progress assistant message.
            let record = store.get(tempAssistantMessageId)
            if (!record) {
              record = store.create(tempAssistantMessageId, "AiMessage")
              record.setValue(tempAssistantMessageId, "id")
              record.setValue("ASSISTANT", "role")
              record.setValue("", "content")
              record.setValue(new Date().toISOString(), "createdAt")
              const edge = ConnectionHandler.createEdge(store, connection, record, "AiMessageEdge")
              ConnectionHandler.insertEdgeAfter(connection, edge)
            }
            const current = (record.getValue("content") as string | null) ?? ""
            record.setValue(current + event.delta, "content")
            break
          }
          case "AiMessageCompleteEvent": {
            // Server's real edges have been @appendEdge'd; remove the temp records.
            ConnectionHandler.deleteNode(connection, tempUserMessageId)
            ConnectionHandler.deleteNode(connection, tempAssistantMessageId)
            break
          }
          case "AiMessageErrorEvent": {
            // Roll back any optimistic state on error.
            ConnectionHandler.deleteNode(connection, tempUserMessageId)
            ConnectionHandler.deleteNode(connection, tempAssistantMessageId)
            break
          }
        }
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
        <AiChatInput onSubmit={handleSubmit} disabled={isInFlight} />
      </div>
    </div>
  )
}
