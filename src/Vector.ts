export default class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  lerp(other: Vector, t: number) {
    // * lerp : Linear Interpolation (선형 보간)
    // * https://spiralmoon.tistory.com/entry/Algorithm-%EC%84%A0%ED%98%95-%EB%B3%B4%EA%B0%84%EB%B2%95-Linear-interpolation (레퍼런스)
    return new Vector(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t
    );
  }
}
