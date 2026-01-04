import { NextTetrominoView } from "apps/MainApp/pages/Tetris/components/NextTetrominoView/NextTetrominoView";
import { TetrisState } from "apps/MainApp/pages/Tetris/reducers/TetrisReducer";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import TetrisScore from "apps/MainApp/pages/Tetris/components/TetrisScore";

type Props = {
  state: TetrisState;
};

const styles = stylex.create({
  sidePanel: {
    width: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default function TetrisSidePanel(props: Props) {
  return (
    <div {...stylex.props(styles.sidePanel)}>
      <NextTetrominoView nextTetromino={props.state.nextTetromino} />
      <TetrisScore score={props.state.score} />
    </div>
  );
}
