import {useContext} from "react";
import AppContext from "../context/AppContext";

export default function LoggedInComponentGating(props: {
  children: JSX.Element
}): JSX.Element | null {
  const context = useContext(AppContext);
  if (context?.user == null) {
    return null;
  }
  return props.children;
}