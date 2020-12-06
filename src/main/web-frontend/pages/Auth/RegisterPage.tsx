import * as React from "react";
import {commit} from "mutations/RegisterMutation";
import FormField from "./components/FormField";
import {useState} from "react";
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  return (
    <div>
      <FormField formName={"Email"} title={"email"} type={"text"} onChange={(text) => {
        setEmail(text);
      }}/>
      <FormField formName={"Password"} title={"password"} type={"password"} onChange={(text) => {
        setPassword(text);
      }}/>
      <button onClick={() => {
        commit(email, password, (success) => {
          if (success) {
            history.push("/login?success=true")
          }
        })
      }
      }>
        Submit
      </button>
    </div>)
}