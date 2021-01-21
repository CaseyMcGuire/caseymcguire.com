import {List} from "immutable";

export default class ImmutableBoard<T> {

  constructor(private board: List<List<T>>) {}

  public get(x: number, y: number): T {
    const row = ImmutableBoard.undefinedThrows(this.board.get(y));
    return ImmutableBoard.undefinedThrows(row.get(x));
  }

  public set(x: number, y: number, value: T): ImmutableBoard<T> {
    if (y >= this.getHeight() || y < 0) {
      throw new Error(`Out of bounds,  y: ${y}, height: ${this.getHeight()}`)
    }
    const row = ImmutableBoard.undefinedThrows(this.board.get(y));
    const newInnerRow = row.set(x, value);
    const newBoard = this.board.set(y, newInnerRow);
    return new ImmutableBoard<T>(newBoard);
  }

  public getHeight(): number {
    return this.board.size;
  }

  public getWidth(): number {
    if (this.board.isEmpty()) {
      return 0;
    }
    // assume it's a uniform board
    return this.board.get(0)!.size;
  }

  public getBoard(): List<List<T>> {
    return this.board;
  }

  public toArray(): Array<Array<T>> {
    return this.board.map(row => row?.toArray() ?? []).toArray();
  }

  private static undefinedThrows<T>(elem: T | undefined): T {
    if (elem === undefined) {
      throw new Error("Unexpected undefined");
    }
    return elem;
  }

  public static fromArray<T>(initialBoard: Array<Array<T>>): ImmutableBoard<T> {
    const tempBoard = [];
    for (let i = 0; i < initialBoard.length; i++) {
      tempBoard.push(List(initialBoard[i]));
    }
    return new ImmutableBoard<T>(List(tempBoard));
  }

}