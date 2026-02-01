import {createPortal} from "react-dom";
import * as stylex from "@stylexjs/stylex";
import {ReactNode, useRef} from "react";

type Props = {
  isVisible: boolean,
  children?: ReactNode,
}

const styles = stylex.create({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    minWidth: 400,
    minHeight: 200,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(229, 231, 235)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
    outline: 'none',
  }
});

export default function Modal(props: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (props.isVisible && createPortal(
      <div {...stylex.props(styles.container)}>
        <div
          {...stylex.props(styles.modal)}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}>
          {props.children}
        </div>
      </div>,
      document.body
    )
  )
}
