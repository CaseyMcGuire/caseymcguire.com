import * as React from "react";
import {useContext} from "react";
import UserContext from "components/context/UserContext";

export default function AdminComponentGating(props: {
  children: React.ReactNode
}): React.ReactNode {
  const context = useContext(UserContext);
  if (context?.user?.isAdmin != true || props.children == null) {
    return null;
  }
  return props.children;
}