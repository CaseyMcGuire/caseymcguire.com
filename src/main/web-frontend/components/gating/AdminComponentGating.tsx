import * as React from "react";
import {useContext} from "react";
import AppContext from "../context/AppContext";

export default function AdminComponentGating(props: {
  children: React.JSX.Element | null
}): React.JSX.Element | null {
  const context = useContext(AppContext);
  if (context?.user?.isAdmin != true || props.children == null) {
    return null;
  }
  return props.children;
}