import ImmutableBoard from 'pages/Tetris/models/ImmutableBoard';
import * as stylex from '@stylexjs/stylex';

type Props = {
  board: ImmutableBoard<string>;
  isPaused: boolean;
  isGameOver: boolean;
  handleUnpauseButtonPress: () => void;
  handleRestartButtonPress: () => void;
};

const styles = stylex.create({
  tetrisBoardContainer: {
    position: 'relative',
    width: 'max-content',
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
    width: '100%',
  },
  continueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 100,
    backgroundColor: 'rgba(0,0,255,1)',
    color: 'white',
    borderRadius: '10%',
    cursor: 'pointer',
  },
  tetrisBoard: {
    borderCollapse: 'separate',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
  },
  tetrisSquare: {
    margin: 1,
    height: 30,
    width: 30,
  },
});

export default function TetrisBoard(props: Props) {
  const board = props.board.convertToArray().map((row, rowIndex) => {
    if (row == null) {
      return null;
    }
    return (
      <tr key={rowIndex}>
        {row.map((elem, index) => (
          <td
            key={`${rowIndex}-${index}`}
            {...stylex.props(styles.tetrisSquare)}
            style={{ backgroundColor: elem }}
          />
        ))}
      </tr>
    );
  });

  const handleClick = () => {
    if (props.isGameOver) {
      props.handleRestartButtonPress();
    }
    else if (props.isPaused) {
      props.handleUnpauseButtonPress();
    }
  }

  return (
    <div {...stylex.props(styles.tetrisBoardContainer)}>
      <TetrisCoverPanel
        isPaused={props.isPaused}
        isGameOver={props.isGameOver}
        handleClick={handleClick}
      />
      <table {...stylex.props(styles.tetrisBoard)}>
        <tbody>{board}</tbody>
      </table>
    </div>
  );
}

function TetrisCoverPanel(props: {
  isPaused: boolean,
  isGameOver: boolean,
  handleClick: () => void
}) {
  if (!props.isPaused && !props.isGameOver) {
    return null;
  }
  return (
    <div {...stylex.props(styles.pausePanel)}>
      <div {...stylex.props(styles.pausePanelControls)}>
        <div {...stylex.props(styles.continueButton)} onClick={props.handleClick}>
          {props.isGameOver ? 'Start over?' : 'Continue'}
        </div>
      </div>
    </div>
  );
}
