
export default class Point {
  constructor(private x: number, private y: number) {}

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public equals(p: Point): boolean {
    return p.getX() === this.getX() && p.getY() === this.getY();
  }
}