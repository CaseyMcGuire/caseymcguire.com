import * as stylex from "@stylexjs/stylex";
import CsrfToken from "components/csrf/CsrfToken";
import FormField from "apps/MainApp/pages/Auth/components/FormField";
import * as React from "react";

const styles = stylex.create({
  loginFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  },
  loginForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    flexDirection: 'column',
    boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgb(229, 231, 235)',
    height: '320px',
    width: '448px'
  }
})

export default function AuthFormContainer(props: { children: React.ReactNode }) {
  return (<div {...stylex.props(styles.loginFormContainer)}>
    <div {...stylex.props(styles.loginForm)}>
      {props.children}
    </div>
  </div>
  )
}