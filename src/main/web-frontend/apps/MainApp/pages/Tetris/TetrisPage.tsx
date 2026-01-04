import * as React from "react";
import Page from "apps/MainApp/components/Page";
import Tetris from "apps/MainApp/pages/Tetris/components/Tetris/Tetris";

export default function TetrisPage(): JSX.Element {
  return (
    <Page>
      <Tetris />
    </Page>
  );
}

