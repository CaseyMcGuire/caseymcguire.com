import * as stylex from "@stylexjs/stylex";
import {CircleAlert} from "lucide-react";

type Props = {
  message: string,
}

const styles = stylex.create({
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBlock: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fecaca',
    color: '#991b1b',
    fontSize: 14,
    fontFamily: '"Noto Sans", sans-serif',
  },
})

export default function AiChatErrorBanner(props: Props) {
  return (
    <div sx={styles.banner} role="alert">
      <CircleAlert size={16} />
      <span>{props.message}</span>
    </div>
  )
}