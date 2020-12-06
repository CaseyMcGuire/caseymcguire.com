import * as React from "react";
import FormField from "./components/FormField";
import CsrfToken from "../../components/csrf/CsrfToken";

export default function LoginPage() {
  return (
    <form action="/login" method="POST">
      <CsrfToken />
      <FormField formName={"Email"} title={"email"} type={"text"}/>
      <FormField formName={"Password"} title={"password"} type={"password"}/>

      <input name="submit" type="submit" value="submit" />
    </form>
  )
}