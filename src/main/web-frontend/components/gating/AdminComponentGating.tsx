import * as React from "react";
import {useContext} from "react";
import AppContext from "../context/AppContext";

export default function AdminComponentGating(props: {
  children: JSX.Element
}): JSX.Element | null {
  const context = useContext(AppContext);
  if (context?.user?.isAdmin != true) {
    return null;
  }
  return props.children;
}