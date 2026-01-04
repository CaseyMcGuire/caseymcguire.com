import * as React from "react";
import FormField from "apps/MainApp/pages/Auth/components/FormField";
import CsrfToken from "components/csrf/CsrfToken";
import Page from "apps/MainApp/components/Page";
import * as stylex from '@stylexjs/stylex';
import AuthFormContainer from "apps/MainApp/pages/Auth/components/AuthFormContainer";

const styles = stylex.create({
  loginFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  },
  loginHeader: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  loginForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    flexDirection: 'column',
    boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(229, 231, 235)',
    height: '320px',
    width: '448px'
  },
  submitButton: {
    backgroundColor: 'rgb(37, 99, 235)',
    padding: '8px 16px',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '4px',
    borderStyle: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%'
  },
  formContainer: {
    margin: '8px 0px'
  },
  errorAlert: {
    backgroundColor: 'rgb(254, 226, 226)',
    padding: '16px',
    color: 'rgb(153, 25, 25)',
    borderRadius: '6px'
  }
})

export default function LoginPage() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <Page>
      <AuthFormContainer>
          <div {...stylex.props(styles.loginHeader)}>
            {'Sign In'}
          </div>
          <ErrorBanner isVisible={params.error != null} />
          <form action="/login" method="POST">
            <CsrfToken />
            <div {...stylex.props(styles.formContainer)}>
              <FormField labelText={"Email"} formName={"username"} placeholder={"Enter your Email"} type={"text"}/>
            </div>
            <div {...stylex.props(styles.formContainer)}>
              <FormField labelText={"Password"} formName={"password"} placeholder={"Enter your password"} type={"password"}/>
            </div>
            <input {...stylex.props(styles.submitButton)} name="submit" type="submit" value="Sign In" />
          </form>
      </AuthFormContainer>
    </Page>
  )
}

function ErrorBanner(props: {isVisible: boolean}) {
  if (!props.isVisible) {
    return null
  }
  return (
    <div {...stylex.props(styles.errorAlert)}>
      Incorrect username or password
    </div>
  )
}