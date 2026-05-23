import * as stylex from "@stylexjs/stylex";
import AiChatInput from "apps/AiChat/components/AiChatInput";
import AiChatMessageList, {AI_CHAT_MESSAGES_CONNECTION_KEY} from "apps/AiChat/components/AiChatMessageList";
import AiChatMessageBubble from "apps/AiChat/components/AiChatMessageBubble";
import AiChatErrorBanner from "apps/AiChat/components/AiChatErrorBanner";
import AiChatThinkingIndicator from "apps/AiChat/components/AiChatThinkingIndicator";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import {ConnectionHandler, graphql, requestSubscription, useRelayEnvironment} from "react-relay";
import {AiChatConversationSendMessageSubscription} from "__generated__/relay/AiChatConversationSendMessageSubscription.graphql";
import {useState} from "react";
import {useNavigate} from "react-router";
import {AIChatRoutes} from "__generated__/routes/AIChatRoutes";

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
    overflowY: 'auto',
    // minHeight: 0 is required so this flex child can shrink below its content
    // size and let overflow scrolling kick in instead of growing the parent.
    minHeight: 0,
  },
  messages: {
    maxWidth: '700px',
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
    flexShrink: 0,
  },
})

type StreamingState = {
  userText: string,
  assistantText: string,
}

type Props = {
  conversationId?: string,
  query: AiChatMessageList_query$key | null,
}

export default function AiChatConversation(props: Props) {
  const environment = useRelayEnvironment()
  const navigate = useNavigate()
  const [isInFlight, setIsInFlight] = useState(false)
  const [streaming, setStreaming] = useState<StreamingState | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = (text: string) => {
    if (isInFlight) {
      return
    }
    setErrorMessage(null)
    setIsInFlight(true)
    setStreaming({userText: text, assistantText: ''})

    const connections = props.conversationId
      ? [ConnectionHandler.getConnectionID(props.conversationId, AI_CHAT_MESSAGES_CONNECTION_KEY)]
      : []

    // Captured across events. Set on Started, used on Complete to navigate for new conversations.
    let newConversationId: string | null = null

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
        if (!event) {
          return
        }
        switch (event.__typename) {
          case "AiMessageStartedEvent":
            newConversationId = event.conversationId
            break
          case "AiMessageChunkEvent":
            setStreaming(prev =>
              prev ? {...prev, assistantText: prev.assistantText + event.delta} : null
            )
            break
          case "AiMessageCompleteEvent":
            setStreaming(null)
            setIsInFlight(false)
            // New-conversation path: subscription was started with no connection to append into,
            // so the @appendEdge above is a no-op. Navigate so the page re-queries and pulls in
            // both persisted messages.
            if (!props.conversationId && newConversationId) {
              navigate(AIChatRoutes.VIEW_CHAT.replace(':conversationId', newConversationId))
            }
            break
          case "AiMessageErrorEvent":
            setStreaming(null)
            setIsInFlight(false)
            setErrorMessage(event.userFacingErrorMessage)
            break
        }
      },
      onError: (error) => {
        setStreaming(null)
        setIsInFlight(false)
        setErrorMessage("Something went wrong. Please try again.")
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
          {streaming && (
            <>
              <AiChatMessageBubble role="USER" content={streaming.userText} />
              {streaming.assistantText === ''
                ? <AiChatThinkingIndicator />
                : <AiChatMessageBubble role="ASSISTANT" content={streaming.assistantText} />}
            </>
          )}
          {errorMessage && <AiChatErrorBanner message={errorMessage} />}
        </div>
      </div>
      <div sx={styles.inputContainer}>
        <AiChatInput onSubmit={handleSubmit} disabled={isInFlight} />
      </div>
    </div>
  )
}