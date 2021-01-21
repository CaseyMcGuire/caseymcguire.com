import * as React from "react";
import FormField from "./components/FormField";
import CsrfToken from "../../components/csrf/CsrfToken";
import Page from "../Page/Page";

export default function LoginPage() {
  return (
    <Page>
    <form action="/login" method="POST">
      <CsrfToken />
      <FormField formName={"Email"} title={"email"} type={"text"}/>
      <FormField formName={"Password"} title={"password"} type={"password"}/>

      <input name="submit" type="submit" value="submit" />
    </form>
    </Page>
  )
}