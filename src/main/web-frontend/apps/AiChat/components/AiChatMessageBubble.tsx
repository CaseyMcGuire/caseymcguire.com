import * as stylex from "@stylexjs/stylex";

type Props = {
  role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL' | '%future added value',
  content: string,
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
    padding: 8,
    fontSize: 14,
    fontFamily: '"Noto Sans", sans-serif',
  },
  aiMessage: {
    backgroundColor: 'rgb(243, 244, 246)',
    borderRadius: 8,
    padding: 8,
  },
  userMessage: {
    backgroundColor: 'rgb(229, 231, 235)',
    borderRadius: 8,
  }
})

export default function AiChatMessageBubble(props: Props) {
  return (
    <div sx={[
      styles.messageContainer,
      props.role === 'USER' ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      <div sx={[
        styles.message,
        props.role === 'USER' ? styles.userMessage : styles.aiMessage
      ]}
      >
        {props.content}
      </div>
    </div>
  )
}