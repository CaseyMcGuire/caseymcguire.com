import * as React from "react";
import {commit} from "mutations/RegisterMutation";
import FormField from "./components/FormField";
import {useState} from "react";
import { useNavigate } from "react-router";
import Page from "../Page/Page";

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  return (
    <Page>
    <div>
      <FormField formName={"Email"} placeholder={"Enter your email"} type={"text"} onChange={(text) => {
        setEmail(text);
      }}/>
      <FormField formName={"Password"} placeholder={"Enter your password"} type={"password"} onChange={(text) => {
        setPassword(text);
      }}/>
      <button onClick={() => {
        commit(email, password, (success) => {
          if (success) {
            navigate("/login?success=true")
          }
        })
      }
      }>
        Submit
      </button>
    </div>
    </Page>)
}