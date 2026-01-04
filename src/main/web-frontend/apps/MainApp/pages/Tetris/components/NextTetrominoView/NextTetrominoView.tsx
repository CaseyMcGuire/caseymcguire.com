import * as React from "react";
import TetrisBoard from "apps/MainApp/pages/Tetris/components/TetrisBoard/TetrisBoard";
import ImmutableBoard from "apps/MainApp/pages/Tetris/models/ImmutableBoard";
import Tetromino from "apps/MainApp/pages/Tetris/models/Tetromino";
import {placePiece} from "apps/MainApp/pages/Tetris/reducers/TetrisReducer";
import Point from "apps/MainApp/pages/Tetris/models/Point";

type Props = {
  nextTetromino: Tetromino
};

export function NextTetrominoView(props: Props) {

  const board = placePiece(ImmutableBoard.withDimensions(4, 4), new Point(1,1), props.nextTetromino);

  return (
    <div>
      <TetrisBoard
        board={board}
        isPaused={false}
        isGameOver={false}
        handleUnpauseButtonPress={() => {}}
        handleRestartButtonPress={() => {}}/>
    </div>
  );
}
