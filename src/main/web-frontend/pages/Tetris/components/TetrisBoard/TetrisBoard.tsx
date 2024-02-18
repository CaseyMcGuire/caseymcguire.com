import * as React from "react";
import ImmutableBoard from "../../models/ImmutableBoard";
import {createUseStyles} from "react-jss";

type Props = {
  board: ImmutableBoard<string>
};

const useStyles = createUseStyles({
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


  return (
    <div>
      <table className={styles.tetrisBoard}>
        <tbody>
        {board}
        </tbody>
      </table>
    </div>
  );
}