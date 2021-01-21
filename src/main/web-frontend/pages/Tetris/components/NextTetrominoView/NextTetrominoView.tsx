import * as React from "react";
import TetrisBoard from "../TetrisBoard/TetrisBoard";
import ImmutableBoard from "../../models/ImmutableBoard";

type Props = {};

export function NextTetrominoView(props: Props) {

  return (
    <div>
      <TetrisBoard board={ImmutableBoard.fromArray([['green']])}/>
    </div>
  );
}
