import {useContext} from "react";
import UserContext from "components/context/UserContext";

export default function LoggedInComponentGating(props: {
  children: JSX.Element
}): JSX.Element | null {
  const context = useContext(UserContext);
  if (context?.user == null) {
    return null;
  }
  return props.children;
}