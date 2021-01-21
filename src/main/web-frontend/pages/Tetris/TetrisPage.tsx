import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../Page/Page";
import Tetris from "./components/Tetris/Tetris";

function TetrisPage(): JSX.Element {
  return (
    <Page>
      <Tetris />
    </Page>
  );
}

ReactDOM.render(<TetrisPage/>, document.getElementById("main"));
