import * as React from "react";
import FormField from "./components/FormField";
import CsrfToken from "../../components/csrf/CsrfToken";
import Page from "../Page/Page";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
  loginForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    flexDirection: 'column'
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    color: 'white',
    cursor: 'pointer'
  },
  formContainer: {
    margin: '8px 0px'
  }
})

export default function LoginPage() {
  const styles = useStyles()
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <Page>
      <div className={styles.loginForm}>
        <ErrorBanner isVisible={params.error != null} />
        <form action="/login" method="POST">
          <CsrfToken />
          <div className={styles.formContainer}>
            <FormField formName={"Email"} title={"email"} type={"text"}/>
          </div>
          <div className={styles.formContainer}>
            <FormField formName={"Password"} title={"password"} type={"password"}/>
          </div>
          <input className={styles.submitButton} name="submit" type="submit" value="Submit" />
        </form>
      </div>
    </Page>
  )
}

function ErrorBanner(props: {isVisible: boolean}) {
  if (!props.isVisible) {
    return null
  }
  return (
    <div>
      Incorrect username or password
    </div>
  )
}