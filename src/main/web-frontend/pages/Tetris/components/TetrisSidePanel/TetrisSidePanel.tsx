import {NextTetrominoView} from "../NextTetrominoView/NextTetrominoView";
import {TetrisState} from "../../reducers/TetrisReducer";
import * as React from "react";
import {createUseStyles} from "react-jss";
import TetrisScore from "../TetrisScore";

type Props = {
  state: TetrisState
}

const useStyles = createUseStyles({
  sidePanel: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default function TetrisSidePanel(props: Props) {
  const styles = useStyles()
  return (
    <div className={styles.sidePanel}>
      <NextTetrominoView nextTetromino={props.state.nextTetromino} />
      <TetrisScore score={props.state.score} />
    </div>
  )
}