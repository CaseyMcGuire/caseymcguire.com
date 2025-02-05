import * as React from "react";
import {commit} from "mutations/RegisterMutation";
import FormField from "./components/FormField";
import {useState} from "react";
import { useNavigate } from "react-router";
import Page from "../Page/Page";
import AuthFormContainer from "pages/Auth/components/AuthFormContainer";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  submitButton: {
    backgroundColor: 'rgb(37, 99, 235)',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%'
  },
  loginHeader: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px'
  },
})

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  return (
    <Page>
      <AuthFormContainer>
        <div {...stylex.props(styles.loginHeader)}>
          {'Create Account'}
        </div>
    <div>
      <FormField formName={"Email"} placeholder={"Enter your email"} type={"text"} onChange={(text) => {
        setEmail(text);
      }}/>
      <FormField formName={"Password"} placeholder={"Enter your password"} type={"password"} onChange={(text) => {
        setPassword(text);
      }}/>
      <button {...stylex.props(styles.submitButton)} onClick={() => {
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
      </AuthFormContainer>
    </Page>)
}