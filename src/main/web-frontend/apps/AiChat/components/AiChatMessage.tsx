import {graphql, useFragment} from "react-relay";
import {AiChatMessage_message$key} from "__generated__/relay/AiChatMessage_message.graphql";
import * as stylex from "@stylexjs/stylex";

type Props = {
  message: AiChatMessage_message$key,
};

const styles = stylex.create({
  messageContainer: {
    display: 'flex',
    width: '100%',
    marginBlock: 12
  },
  aiMessageContainer: {
    justifyContent: 'flex-start'
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  message: {
    maxWidth: '75%',
    padding: 8
  },
  aiMessage: {
    direction: 'ltr',
    backgroundColor: 'rgb(243, 244, 246)',
    borderRadius: 8,
    padding: 8,
  },
  userMessage: {
    direction: 'rtl',
    backgroundColor: 'rgb(229, 231, 235)',
    borderRadius: 8,
  }
})

export default function AiChatMessage(props: Props) {
  const data = useFragment(
    graphql`
      fragment AiChatMessage_message on AiMessage {
        role
        content
      }
    `,
    props.message
  )

  return (
    <div sx={[
      styles.messageContainer,
      data.role === 'USER' ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      <div sx={[
        styles.message,
        data.role === 'USER' ? styles.userMessage : styles.aiMessage
      ]}
      >
        {data.content}
      </div>
    </div>
  )
}