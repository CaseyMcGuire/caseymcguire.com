import * as React from "react";
import Page from "../Page/Page";
import Tetris from "./components/Tetris/Tetris";

export default function TetrisPage(): JSX.Element {
  return (
    <Page>
      <Tetris />
    </Page>
  );
}

