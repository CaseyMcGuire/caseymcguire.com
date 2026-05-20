import * as stylex from "@stylexjs/stylex";
import {Send} from "lucide-react";
import {KeyboardEvent, useState} from "react";

type Props = {
  onSubmit: (text: string) => void,
  disabled?: boolean,
}

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '700px',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    maxWidth: '700px',
    padding: 12,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: '"Noto Sans", sans-serif',
    fieldSizing: 'content',
    resize: 'none',
    maxHeight: 200,
    marginRight: 8,
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: {
      default: '#171717',
      ':disabled': '#d4d4d4',
    },
    color: '#fff',
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    opacity: {
      default: 1,
      ':hover': 0.85,
    },
    flexShrink: 0,
  },
})

export default function AiChatInput(props: Props) {
  const [text, setText] = useState("")

  const submit = () => {
    if (props.disabled) {
      return
    }
    const trimmed = text.trim()
    if (trimmed.length === 0) {
      return
    }
    props.onSubmit(trimmed)
    setText("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div sx={styles.container}>
      <textarea
        sx={styles.input}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message…"
        disabled={props.disabled}
      />
      <button
        sx={styles.sendButton}
        type="button"
        onClick={submit}
        disabled={props.disabled || text.trim().length === 0}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </div>
  )
}
