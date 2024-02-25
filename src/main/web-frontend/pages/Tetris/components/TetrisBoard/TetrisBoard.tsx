import * as React from "react";
import ImmutableBoard from "../../models/ImmutableBoard";
import {createUseStyles} from "react-jss";

type Props = {
  board: ImmutableBoard<string>,
  isPaused: boolean,
  isGameOver: boolean,
  handleUnpauseButtonPress: () => void,
  handleRestartButtonPress: () => void
};


const useStyles = createUseStyles({
  tetrisBoardContainer: {
    position: 'relative',
    width: 'max-content'
  },
  pausePanel: {
    position: 'absolute',
    display: 'flex',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  pausePanelControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  continueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    width: '100px',
    backgroundColor: 'rgba(0,0,255, 1)',
    color: 'white',
    borderRadius: '10%',
    cursor: 'pointer',
  },
  tetrisBoard: {
    borderCollapse: 'separate',
    border: '1px solid grey'
  },
  tetrisSquare: {
    margin: '1px',
    height: '30px',
    width: '30px'
  }
});

export default function TetrisBoard(props: Props) {
  const styles = useStyles();
  const board = props.board.convertToArray().map(row => {
    if (row == null) {
      return null;
    }
    return (
      <tr>
        {row.map((elem) => <td className={styles.tetrisSquare} style={{backgroundColor: elem}}/>)}
      </tr>
    );
  });

  const handleClick = () => {
    if (props.isGameOver) {
      props.handleRestartButtonPress()
    }
    else if (props.isPaused) {
      props.handleUnpauseButtonPress()
    }
  }


  return (
    <div className={styles.tetrisBoardContainer}>
      <TetrisCoverPanel isPaused={props.isPaused} isGameOver={props.isGameOver} handleClick={handleClick}/>
      <table className={styles.tetrisBoard}>
        <tbody>
        {board}
        </tbody>
      </table>
    </div>
  );
}

function TetrisCoverPanel(props: {
  isPaused: boolean,
  isGameOver: boolean,
  handleClick: () => void
}) {
  const styles = useStyles();
  if (!props.isPaused && !props.isGameOver) {
    return null
  }
  return (
    <div className={styles.pausePanel}>
      <div className={styles.pausePanelControls}>
        <div className={styles.continueButton} onClick={props.handleClick}>
          {
            props.isGameOver ? "Start over?" : "Continue"
          }
        </div>
      </div>
    </div>
  )
}