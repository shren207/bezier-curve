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

  constructor() {
    App.instance = this; // Singleton Pattern

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    //  2~100 까지 random하게 positions에 Vector2를 push.

    this.context = this.canvas.getContext("2d")!;
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);

    this.positions.push(
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY()),
      new Vector(this.randomX(), this.randomY())
    );
  }

  randomX(): number {
    return Math.floor(Math.random() * this.canvas.width);
  }
  randomY(): number {
    return Math.floor(Math.random() * this.canvas.height);
  }
  bezierCurve(positions: Vector[], t: number): void {
    // recursive solution is necessary
    if (positions.length < 2) {
      return;
    }
    let newPositions: Vector[] = [];
    // positions.forEach((position, index) => {
    //
    // }
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    // 1. fill canvas background
    this.canvas.style.backgroundColor = `white`;

    this.positions.forEach((position, index) => {
      this.context.beginPath();
      this.context.arc(position.x, position.y, 5, 0, Math.PI * 2);
      this.context.fillStyle = `black`;
      this.context.fill();
    });

    // 2. draw bezier curve
  };
}

window.addEventListener("load", () => {
  new App();
});
