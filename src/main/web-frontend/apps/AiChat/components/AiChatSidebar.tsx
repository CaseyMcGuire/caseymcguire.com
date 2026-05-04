import * as stylex from "@stylexjs/stylex";
import AiChatNewChatButton from "apps/AiChat/components/AiChatNewChatButton";

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
})

export default function AiChatSidebar() {
  const chats = [
    "Chat 1",
    "Chat 2",
    "Chat 3",
    "Chat 4",
  ]
  return (
    <div sx={styles.container}>
      <div sx={styles.content}>
        <div sx={styles.titleContainer}>
          <span sx={styles.title}>AI Chat</span>
        </div>
        <div>
          {chats.map(chat => (
            <div key={chat}>
              {chat}
            </div>
          ))}
        </div>
      </div>
      <AiChatNewChatButton />
    </div>
  )
}
