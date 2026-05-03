import * as React from "react";
import FormField from "apps/MainApp/pages/Auth/components/FormField";
import {postWithCsrfAndRedirect} from "components/csrf/CsrfUtils";
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
  const errorParam = new URLSearchParams(window.location.search).get('error');

  return (
    <Page>
      <AuthFormContainer>
          <div sx={styles.loginHeader}>
            {'Sign In'}
          </div>
          <ErrorBanner errorType={parseLoginError(errorParam)} />
          <form onSubmit={handleLoginSubmit}>
            <div sx={styles.formContainer}>
              <FormField labelText={"Email"} formName={"username"} placeholder={"Enter your Email"} type={"text"}/>
            </div>
            <div sx={styles.formContainer}>
              <FormField labelText={"Password"} formName={"password"} placeholder={"Enter your password"} type={"password"}/>
            </div>
            <input sx={styles.submitButton} type="submit" value="Sign In" />
          </form>
      </AuthFormContainer>
    </Page>
  )
}

async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  try {
    await postWithCsrfAndRedirect('/login', new FormData(e.currentTarget));
  } catch (err) {
    // Wrong-credentials failures don't reach this catch — Spring's failureUrl redirect
    // succeeds, so we land in `/login?error=invalid_credentials` via the happy path.
    // Anything thrown here is an infrastructure problem (CSRF reject, network, 5xx). Log
    // so it's debuggable, then surface a distinct error to the user.
    console.error('Login request failed:', err);
    window.location.href = '/login?error=unexpected';
  }
}

// "invalid_credentials" comes from Spring Security's overridden formLogin failureUrl
// (see SecurityConfiguration.kt — keep the codes in sync). "unexpected" is what we set
// from the catch in handleLoginSubmit when the request itself fails.
type LoginError = 'invalid_credentials' | 'unexpected';

const LOGIN_ERROR_MESSAGES: Record<LoginError, string> = {
  invalid_credentials: 'Incorrect username or password',
  unexpected: 'Something went wrong. Please try again.',
};

function parseLoginError(raw: string | null): LoginError | undefined {
  return raw != null && raw in LOGIN_ERROR_MESSAGES ? (raw as LoginError) : undefined;
}

type ErrorBannerProps = {
  errorType: LoginError | undefined;
};

function ErrorBanner({errorType}: ErrorBannerProps) {
  if (errorType == null) {
    return null;
  }
  return (
    <div sx={styles.errorAlert}>
      {LOGIN_ERROR_MESSAGES[errorType]}
    </div>
  );
}