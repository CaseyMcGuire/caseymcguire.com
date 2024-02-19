import TetrisBoard from "../TetrisBoard/TetrisBoard";
import * as React from "react";
import {useEffect, useReducer, useState} from "react";
import {initialState, reducer} from "../../reducers/TetrisReducer";
import {createUseStyles} from "react-jss";
import TetrisSidePanel from "../TetrisSidePanel/TetrisSidePanel";

const createStyles = createUseStyles({
  tetrisContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'monospace'
  }
});

export default function Tetris() {
  const styles = createStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    window.setInterval(() => {
      dispatch({type: "TICK"});
    }, 400);

    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case Move.Spin:
          dispatch({type: "ROTATE_PIECE"});
          break;
        case Move.Left:
          dispatch({type: "MOVE_PIECE_LEFT"});
          break;
        case Move.Right:
          dispatch({type: "MOVE_PIECE_RIGHT"});
          break;
        case Move.Drop:
          dispatch({type: "DROP_PIECE"});
          break;
        case Move.Pause:
          dispatch({type: "PAUSE"})
          break;
      }
    }
  },[dispatch]);


  return (
    <div className={styles.tetrisContainer}>
      <TetrisBoard board={state.board}/>
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