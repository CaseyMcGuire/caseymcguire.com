import * as React from "react";
import { useContext } from "react";
import UserContext from "components/context/UserContext";
import {redirect} from "react-router";


type Props = {
  children: React.JSX.Element  | null
}
export default function AdminProtectedRoute(props: Props) {
  const context = useContext(UserContext)
  if (context.user?.isAdmin != true) {
    redirect("/404")
    return null;
  }
  return props.children
}