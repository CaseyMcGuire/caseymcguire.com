import * as stylex from "@stylexjs/stylex";

type Props = {
  text: string,
  onClick: () => void
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
    cursor: "pointer",
    ":hover": {
      backgroundColor: "rgba(37, 99, 235, 0.9)",
    },
  }
})

export default function WikiButton(props: Props) {
  return (
    <button
      {...stylex.props(styles.button)}
      onClick={props.onClick}>{props.text}</button>
  )
}