import * as stylex from "@stylexjs/stylex";

type ButtonState = 'active' | 'disabled' | 'loading';

type Props = {
  text: string,
  onClick: () => void,
  state?: ButtonState
}

const styles = stylex.create({
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "rgb(37, 99, 235)",
    borderRadius: 6,
    color: "rgb(255, 255, 255)",
    fontWeight: 400,
    fontSize: 16,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgb(229, 231, 235)",
    ":hover": {
      backgroundColor: "rgba(37, 99, 235, 0.9)",
    },
  },
  active: {
    cursor: "pointer",
  },
  loading: {
    cursor: 'wait'
  },
  disabled: {
    cursor: 'not-allowed'
  }
})

export default function Button(props: Props) {
  const buttonState = props.state ?? 'active';
  const isDisabled = buttonState != 'active';
  return (
    <button
      {...stylex.props(styles.button, styles[buttonState])}
      disabled={isDisabled}
      onClick={buttonState == 'active' ? props.onClick : undefined}
    >{props.text}</button>
  )
}