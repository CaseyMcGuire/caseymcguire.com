import TetrisBoard from "apps/MainApp/pages/Tetris/components/TetrisBoard/TetrisBoard";
import * as React from "react";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "apps/MainApp/pages/Tetris/reducers/TetrisReducer";
import TetrisSidePanel from "apps/MainApp/pages/Tetris/components/TetrisSidePanel/TetrisSidePanel";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  tetrisContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    fontFamily: "monospace",
  },
});

export default function Tetris() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 400);

    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case Move.Spin:
          dispatch({ type: "ROTATE_PIECE" });
          break;
        case Move.Left:
          dispatch({ type: "MOVE_PIECE_LEFT" });
          break;
        case Move.Right:
          dispatch({ type: "MOVE_PIECE_RIGHT" });
          break;
        case Move.Drop:
          dispatch({ type: "DROP_PIECE" });
          break;
        case Move.Pause:
          dispatch({ type: "PAUSE" });
          break;
      }
    };

    return () => {
      window.clearInterval(id);
      window.onkeydown = null;
    };
  }, [dispatch]);

  return (
    <div {...stylex.props(styles.tetrisContainer)}>
      <TetrisBoard
        board={state.board}
        isPaused={state.isPaused}
        isGameOver={state.isGameOver}
        handleUnpauseButtonPress={() => {
          if (state.isPaused) {
            dispatch({ type: "PAUSE" });
          }
        }}
        handleRestartButtonPress={() => {
          if (state.isGameOver) {
            dispatch({ type: "RESTART" });
          }
        }}
      />
      <TetrisSidePanel state={state} />
    </div>
  );
}

enum Move {
  // These are key codes
  Spin = "ArrowUp", // up key
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Drop = "ArrowDown",
  Pause = "p",
}