import Point from "apps/MainApp/pages/Tetris/models/Point";
import Tetromino from "apps/MainApp/pages/Tetris/models/Tetromino";
import ImmutableBoard from "apps/MainApp/pages/Tetris/models/ImmutableBoard";
import {Actions} from "apps/MainApp/pages/Tetris/reducers/TetrisActions";

export type TetrisState = {
  currentPoint: Point,
  currentTetromino: Tetromino,
  nextTetromino: Tetromino,
  board: ImmutableBoard<string>,
  placeNewPiece: boolean,
  score: number,
  isPaused: boolean,
  isGameOver: boolean
}


const EMPTY_SQUARE_COLOR = "#FFFFFF";
const TOP_POINT = new Point(5, 0);
const DEFAULT_HEIGHT = 20;
const DEFAULT_WIDTH = 10;

export const initialState: TetrisState = {
  currentPoint: TOP_POINT,
  currentTetromino: Tetromino.getRandomPiece(),
  nextTetromino: Tetromino.getRandomPiece(),
  board: ImmutableBoard.fromArray(getInitialBoard()),
  placeNewPiece: true,
  score: 0,
  isPaused: false,
  isGameOver: false
};

function getInitialBoard(): Array<Array<string>> {
  return new Array(DEFAULT_HEIGHT).fill(null).map(
    elem => new Array(DEFAULT_WIDTH).fill(EMPTY_SQUARE_COLOR)
  );
}

export const reducer = (state: TetrisState, action: Actions): TetrisState => {
  switch (action.type) {
    case "TICK":
      return tick();
    case "ROTATE_PIECE":
      return rotate();
    case "DROP_PIECE":
      return drop();
    case "MOVE_PIECE_LEFT":
      return move(-1);
    case "MOVE_PIECE_RIGHT":
      return move(1);
    case "PAUSE":
      return {
        ...state,
        isPaused: !state.isPaused
      }
    case "RESTART":
      return initialState
    default:
      return state;
  }

  function tick(): TetrisState {
    if (state.isPaused || state.isGameOver) {
      return state;
    }
    const newPoint = getNextPoint();
    if (state.placeNewPiece) {
      const canPlaceNewPiece = canPlacePiece(state.board, newPoint, state.currentTetromino);
      if (!canPlaceNewPiece) {
        return {
          ...state,
          isGameOver: true
        };
      }
    }
    const clearedBoard = clearCurrentPiece();
    const canPlaceNewPiece = canPlacePiece(clearedBoard, newPoint, state.currentTetromino);
    if (!canPlaceNewPiece) {
      return {
        ...state,
        board: getBoardWithFilledRowsCleared(),
        currentTetromino: state.nextTetromino,
        nextTetromino: Tetromino.getRandomPiece(),
        currentPoint: TOP_POINT,
        placeNewPiece: true,
        score: state.score + getAdditionalScore()
      };
    }
    return {
      ...state,
      board: placePiece(clearedBoard, newPoint, state.currentTetromino),
      currentPoint: newPoint,
      placeNewPiece: false
    };
  }

  function getAdditionalScore(): number {
    const numFilledRows = getFilledRows().length
    switch (numFilledRows) {
      case 0:
        return 0;
      case 1:
        return 100;
      case 2:
        return 300;
      case 3:
        return 500;
      case 4:
        return 800;
      default:
        // I don't think this case is actually possible
        return 800 + (numFilledRows - 4) * 200
    }
  }

  function getNextPoint(): Point {
    if (state.placeNewPiece) {
      return TOP_POINT;
    }
    else {
      return new Point(state.currentPoint.getX(), state.currentPoint.getY() + 1);
    }
  }

  function getFilledRows(): Array<number> {
    const filledRows: Array<number> = [];
    for (let y = 0; y < state.board.getHeight(); y++) {
      let isFilled = true;
      for (let x = 0; x < state.board.getWidth(); x++) {
        isFilled = isFilled && state.board.get(x, y) !== EMPTY_SQUARE_COLOR;
      }
      if (isFilled) {
        filledRows.push(y);
      }
    }
    return filledRows
  }

  function getBoardWithFilledRowsCleared(): ImmutableBoard<string> {
    const filledRows: Array<number> = getFilledRows()
    filledRows.sort();
    const boardArray = state.board.convertToArray();

    for (const rowIndex of filledRows) {
      boardArray[0] = new Array(DEFAULT_WIDTH).fill(EMPTY_SQUARE_COLOR);
      for (let row = rowIndex; row > 0; row--) {
        boardArray[row] = boardArray[row - 1];
      }
    }
    return ImmutableBoard.fromArray(boardArray);
  }

  function drop(): TetrisState {
    if (state.placeNewPiece || state.isPaused || state.isGameOver) {
      return state;
    }
    for (let y = state.currentPoint.getY() + 1;; y++) {
      const nextPoint = new Point(state.currentPoint.getX(), y);
      const clearedBoard = clearCurrentPiece();
      const canPlaceNewPiece = canPlacePiece(clearedBoard, nextPoint, state.currentTetromino);
      if (!canPlaceNewPiece) {
        const previousPoint = new Point(state.currentPoint.getX(), y - 1);
        return {
          ...state,
          currentPoint: previousPoint,
          board: placePiece(clearedBoard, previousPoint, state.currentTetromino)
        }
      }
    }
  }

  function move(x: number): TetrisState {
    if (state.placeNewPiece || state.isPaused || state.isGameOver) {
      return state;
    }
    const newPoint = new Point(state.currentPoint.getX() + x, state.currentPoint.getY());
    const clearedBoard = clearCurrentPiece();
    const canMove = canPlacePiece(clearedBoard, newPoint, state.currentTetromino);
    if (!canMove) {
      return state;
    }
    return {
      ...state,
      board: placePiece(clearedBoard, newPoint, state.currentTetromino),
      currentPoint: newPoint
    };
  }

  function rotate(): TetrisState {
    if (state.placeNewPiece || state.isPaused || state.isGameOver) {
      return state;
    }
    const clearedBoard = clearCurrentPiece();
    const rotatedTetromino = state.currentTetromino.getRightRotation();
    const canPlaceNewPiece = canPlacePiece(clearedBoard, state.currentPoint, rotatedTetromino);
    if (!canPlaceNewPiece) {
      return state;
    }
    return {
      ...state,
      board: placePiece(clearedBoard, state.currentPoint, rotatedTetromino),
      currentTetromino: rotatedTetromino
    };
  }

  function clearCurrentPiece(): ImmutableBoard<string> {
    return state.currentTetromino.getCurrentRotation().reduce(
      (acc, point) => acc.set(state.currentPoint.getX() + point.getX(), state.currentPoint.getY() + point.getY(), EMPTY_SQUARE_COLOR),
      state.board
    );
  }

  function canPlacePiece(board: ImmutableBoard<string>, point: Point, tetromino: Tetromino): boolean {
    return tetromino.getCurrentRotation().reduce((acc, tetrominoPoint) => {
      const x = tetrominoPoint.getX() + point.getX();
      const y = tetrominoPoint.getY() + point.getY();
      if (x < 0 || x >= board.getWidth() || y < 0 || y >= board.getHeight()) {
        return false;
      }
      return acc && board.get(tetrominoPoint.getX() + point.getX(), tetrominoPoint.getY() + point.getY()) === EMPTY_SQUARE_COLOR;
    }, true);
  }



};

export function placePiece(board: ImmutableBoard<string>, point: Point, tetromino: Tetromino): ImmutableBoard<string> {
  return tetromino.getCurrentRotation().reduce((acc, tetrominoPoint) => {
    const x = tetrominoPoint.getX() + point.getX();
    const y = tetrominoPoint.getY() + point.getY();
    return acc.set(x, y, tetromino.color);
  }, board);
}

