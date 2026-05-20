import * as stylex from "@stylexjs/stylex";

const pulse = stylex.keyframes({
  '0%, 80%, 100%': {opacity: 0.2},
  '40%': {opacity: 1},
})

const styles = stylex.create({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    marginBlock: 12,
  },
  bubble: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgb(243, 244, 246)',
    borderRadius: 8,
    padding: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#525252',
    animationName: pulse,
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
})

export default function AiChatThinkingIndicator() {
  return (
    <div sx={styles.container}>
      <div sx={styles.bubble} role="status" aria-label="Assistant is thinking">
        <div sx={styles.dot} />
        <div sx={[styles.dot, styles.dot2]} />
        <div sx={[styles.dot, styles.dot3]} />
      </div>
    </div>
  )
}
