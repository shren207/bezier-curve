import "./style.css";
import Vector from "./Vector";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Bezier Curve</h1>
  <canvas></canvas>
`;

export default class App {
  static instance: App;

  width: number = window.innerWidth / 2;
  height: number = window.innerHeight / 2;
  canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("canvas")!;
  context: CanvasRenderingContext2D;
  delta: number = 0;
  startTime: number;
  frameRequestHandle: number;
  positions: Vector[] = [];

  previousX: number;
  previousY: number;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.backgroundColor = "white";

    //  2~100 까지 random하게 positions에 Vector2를 push.

    this.context = this.canvas.getContext("2d")!;

    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);

    this.positions.push(
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY())
    );
    this.positions.forEach((position) => {
      this.context.beginPath();
      this.context.arc(position.x, position.y, 5, 0, Math.PI * 2);
      this.context.fillStyle = `black`;
      this.context.fill();
    });
    this.previousX = this.positions[0].x;
    this.previousY = this.positions[0].y;
  }

  randomX(): number {
    return Math.floor(Math.random() * this.canvas.width);
  }
  randomY(): number {
    return Math.floor(Math.random() * this.canvas.height);
  }
  bezierCurve(t: number): void {
    // recursive solution is necessary
    // if (positions.length < 2) {
    //   return;
    // }

    // let newPositions: Vector[] = [];
    let x =
      (1 - t) * (1 - t) * this.positions[0].x +
      2 * (1 - t) * t * this.positions[1].x +
      t * t * this.positions[2].x;
    let y =
      (1 - t) * (1 - t) * this.positions[0].y +
      2 * (1 - t) * t * this.positions[1].y +
      t * t * this.positions[2].y;
    this.context.beginPath();
    this.context.moveTo(this.previousX, this.previousY);
    this.context.lineTo(x, y);
    this.context.stroke();
    this.previousX = x;
    this.previousY = y;
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001; // ms => s
    console.log(this.delta);

    if (this.delta > 1) {
      cancelAnimationFrame(this.frameRequestHandle);
      return;
    }

    this.bezierCurve(this.delta);

    // 2. draw bezier curve
  };
}

window.addEventListener("load", () => {
  new App();
});
