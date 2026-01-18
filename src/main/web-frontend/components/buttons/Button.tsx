import * as stylex from "@stylexjs/stylex";
import {LucideIcon} from "lucide-react";

type ButtonState = 'active' | 'disabled' | 'loading';
type ButtonStyle = 'primary' | 'dark'

type Props = {
  text: string,
  onClick: () => void,
  state?: ButtonState,
  style?: ButtonStyle,
  icon?: LucideIcon
}

const styles = stylex.create({
  primary: {
    backgroundColor: "rgb(37, 99, 235)",
    ":hover": {
      backgroundColor: "rgba(37, 99, 235, 0.9)",
    },
  },
  dark: {
    backgroundColor: "rgb(30, 30, 30)",
    ":hover": {
      backgroundColor: "rgba(30, 30, 30, 0.9)",
    }
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,
    color: "rgb(255, 255, 255)",
    fontWeight: 400,
    fontSize: 16,
    fontFamily: 'inherit',
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgb(229, 231, 235)",
  },
  active: {
    cursor: "pointer",
  },
  loading: {
    cursor: 'wait'
  },
  disabled: {
    cursor: 'not-allowed'
  },
  iconContainer: {
    marginRight: 8,
  }
})

export default function Button(props: Props) {
  const buttonStyle = props.style ?? 'primary';
  const buttonState = props.state ?? 'active';
  const isDisabled = buttonState != 'active';
  return (
    <button
      {...stylex.props(styles.button, styles[buttonState], styles[buttonStyle])}
      disabled={isDisabled}
      onClick={buttonState == 'active' ? props.onClick : undefined}
    >
      {
        props.icon && (
          <div {...stylex.props(styles.iconContainer)}>
              <props.icon color={'white'} size={16} />
          </div>
        )
      }
      {props.text}
    </button>
  )
}