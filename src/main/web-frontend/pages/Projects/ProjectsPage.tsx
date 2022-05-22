import * as React from "react";
import Page from "../Page/Page";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  return (
   <Page>
     <div><Link to={"/tetris"}>Tetris</Link></div>
   </Page>
  )
}