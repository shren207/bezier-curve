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

    this.context = this.canvas.getContext("2d")!;

    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);

    for (let i = 0; i < Math.floor(Math.random() * 20) + 3; i++) {
      this.positions.push(new Vector(this.randomX(), this.randomY()));
    }

    this.positions.forEach((position, index) => {
      this.context.beginPath();
      this.context.arc(position.x, position.y, 5, 0, Math.PI * 2);
      this.context.fillStyle = `black`;
      this.context.fill();

      if (index + 1 === this.positions.length) {
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        return;
      }
      this.context.beginPath();
      this.context.moveTo(this.positions[index].x, this.positions[index].y);
      this.context.lineTo(
        this.positions[index + 1].x,
        this.positions[index + 1].y
      );
      this.context.strokeStyle = `red`;
      this.context.lineWidth = 2;
      this.context.stroke();
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
  bezierCurve(positions: Array<Vector>, t: number): Vector {
    if (positions.length === 1) return positions[0];

    const newPositions: Array<Vector> = [];
    positions.forEach((position, index) => {
      if (index + 1 === positions.length) return;
      const x = (1 - t) * position.x + t * positions[index + 1].x;
      const y = (1 - t) * position.y + t * positions[index + 1].y;
      newPositions.push(new Vector(x, y));
    });
    return this.bezierCurve(newPositions, t);
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();

    // feedback : 여기 변수명을 delta로 하는 것이 옳은 지?
    this.delta = (currentTime - this.startTime) * 0.001; // ms => s

    if (this.delta > 1) {
      cancelAnimationFrame(this.frameRequestHandle);
      return;
    }

    const { x, y } = this.bezierCurve(this.positions, this.delta);

    this.context.beginPath();
    this.context.moveTo(this.previousX, this.previousY);
    this.context.lineTo(x, y);
    this.context.stroke();
    this.previousX = x;
    this.previousY = y;
  };
}

window.addEventListener("load", () => {
  new App();
});
