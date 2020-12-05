import * as React from "react";
import {commit} from "mutations/RegisterMutation";
import {createUseStyles} from "react-jss";
import FormField from "./components/FormField";
import {useState} from "react";

const getStyles = createUseStyles({
  homePageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div>
      <FormField formName={"Email"} title={"email"} type={"text"} onChange={(text) => {
        setEmail(text);
      }}/>
      <FormField formName={"Password"} title={"password"} type={"password"} onChange={(text) => {
        setPassword(text);
      }}/>
      <button onClick={() => {
        commit(email, password)
      }
      }>
        Submit
      </button>
    </div>)
}