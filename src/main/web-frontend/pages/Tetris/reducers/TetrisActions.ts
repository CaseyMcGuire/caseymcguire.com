type TickAction = {
  type: "TICK",
};

type RotatePieceAction = {
  type: "ROTATE_PIECE",
};

type DropPieceAction = {
  type: "DROP_PIECE"
};

type MovePieceRightAction = {
  type: "MOVE_PIECE_RIGHT"
};

type MovePieceLeftAction = {
  type: "MOVE_PIECE_LEFT"
};

export type Actions =
  TickAction
  | RotatePieceAction
  | DropPieceAction
  | MovePieceLeftAction
  | MovePieceRightAction;