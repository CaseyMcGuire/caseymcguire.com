import * as stylex from "@stylexjs/stylex";
import AiChatInput from "apps/AiChat/components/AiChatInput";
import AiChatMessageList from "apps/AiChat/components/AiChatMessageList";
import {AiChatMessageList_query$key} from "__generated__/relay/AiChatMessageList_query.graphql";
import {graphql, useMutation} from "react-relay";
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
      mutation AiChatConversationSendMessageMutation($conversationId: ID, $message: String!) {
        sendMessage(conversationId: $conversationId, message: $message) {
          __typename
          ... on SuccessfulChatResponse {
            conversationId
            reply
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
    commitSendMessage({
      variables: {
        conversationId: props.conversationId ?? null,
        message: text,
      },
      onCompleted: (response) => {
        switch (response.sendMessage.__typename) {
          case "SuccessfulChatResponse":
            console.log("reply:", response.sendMessage.reply)
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