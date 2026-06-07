import {BotMessageSquare, SquarePen} from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import {useNavigate} from "react-router";
import {AIChatRoutes} from "__generated__/routes/AIChatRoutes";

const styles = stylex.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgb(243, 244, 246)'
    },
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    marginLeft: 8,
  }
})

export default function AiChatNewChatButton() {
  const navigate = useNavigate()
  return (
    <div sx={styles.button} onClick={() => navigate(AIChatRoutes.AiChatIndex())}>
      <SquarePen size={24} />
      <span sx={styles.text}>New Chat</span>
    </div>
  )
}
