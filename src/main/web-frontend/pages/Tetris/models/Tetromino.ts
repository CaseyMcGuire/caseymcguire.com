import Point from "./Point";

export default class Tetromino {

  public static BLOCK: Tetromino = new Tetromino([new Point(0, 0),
    new Point(1, 0),
    new Point(0, 1),
    new Point(1, 1),
  ], "#E56100");

  public static STRAIGHT: Tetromino = new Tetromino([new Point(-1, 0),
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
  ], "#D100E5");

  public static T: Tetromino = new Tetromino([new Point(0, 0),
    new Point(-1, 0),
    new Point(1, 0),
    new Point(0, 1),
  ], "#0300E5");

  public static J: Tetromino = new Tetromino([new Point(0, 0),
    new Point(1, 0),
    new Point(-1, 0),
    new Point(-1, 1),
  ], "#00E1E5");

  public static L: Tetromino = new Tetromino([new Point(0, 0),
    new Point(1, 0),
    new Point(-1, 0),
    new Point(1, 1),
  ], "#0FE500");

  public static S: Tetromino = new Tetromino([new Point(0, 0),
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 1),
  ], "#E5CA00");

  public static Z: Tetromino = new Tetromino([new Point(0, 0),
    new Point(-1, 0),
    new Point(0, 1),
    new Point(1, 1),
  ], "#E51A0E");

  /**
   * @return A random Tetrinomo piece
   */
  public static getRandomPiece(): Tetromino {
    const val = Math.floor(Math.random() * Tetromino.tetrominoes.length);
    return Tetromino.tetrominoes[val];
  }

  private static tetrominoes: Tetromino[] = [
    Tetromino.BLOCK,
    Tetromino.STRAIGHT,
    Tetromino.T,
    Tetromino.J,
    Tetromino.L,
    Tetromino.S,
    Tetromino.Z,
  ];

  private constructor(private points: Point[], readonly color: string) {}

  public getRightRotation(): Tetromino {
    return new Tetromino(this.rotateRight(), this.color);
  }

  /** @returns The current rotation of this piece as an array of points. */
  public getCurrentRotation(): Point[] {
    const rotatedArray: Point[] = [];
    for (const point of this.points) {
      rotatedArray.push(point);
    }
    return rotatedArray;
  }

  private rotateRight(): Point[] {
    const rotatedPoints = [];
    for (const point of this.points) {
      rotatedPoints.push(new Point(point.getY(), -point.getX()));
    }
    return rotatedPoints;
  }

}