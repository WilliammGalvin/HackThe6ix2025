import p5 from "p5";
import Timer from "../timer";
import GameElement from "./element";

class ProgressBarComp extends GameElement {
  x: number;
  y: number;
  width: number;
  height: number;
  timer: Timer;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    timer: Timer
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.timer = timer;
  }

  override render(p5: p5): void {
    const progress = 1 - this.timer.getProgress();

    p5.stroke(0);
    p5.strokeWeight(2);
    p5.fill(255);
    p5.rect(this.x, this.y, this.width, this.height, 5);
    p5.fill(114, 224, 58);
    p5.rect(this.x, this.y, this.width * progress, this.height, 5);
  }
}

export default ProgressBarComp;
