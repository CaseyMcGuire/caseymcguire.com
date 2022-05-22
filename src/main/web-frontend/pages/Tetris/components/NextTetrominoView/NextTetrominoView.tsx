import * as React from "react";
import TetrisBoard from "../TetrisBoard/TetrisBoard";
import ImmutableBoard from "../../models/ImmutableBoard";
import Tetromino from "../../models/Tetromino";
import {placePiece} from "../../reducers/TetrisReducer";
import Point from "../../models/Point";

type Props = {
  nextTetromino: Tetromino
};

export function NextTetrominoView(props: Props) {

  const board = placePiece(ImmutableBoard.withDimensions(4, 4), new Point(1,1), props.nextTetromino);

  return (
    <div>
      <TetrisBoard board={board}/>
    </div>
  );
}
