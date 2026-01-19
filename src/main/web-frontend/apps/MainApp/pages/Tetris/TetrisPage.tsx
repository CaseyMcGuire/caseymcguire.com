import * as React from "react";
import Page from "apps/MainApp/components/Page";
import Tetris from "apps/MainApp/pages/Tetris/components/Tetris/Tetris";
import {ReactNode} from "react";

export default function TetrisPage(): ReactNode {
  return (
    <Page>
      <Tetris />
    </Page>
  );
}

