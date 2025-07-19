import p5 from "p5";
import GameElement from "./elements/element";
import Game from "./game";
import Timer from "./timer";

class ClickSection extends GameElement {
  x: number;
  y: number;
  width: number;
  height: number;
  action: () => void;
  interactionTimer: Timer;
  hasDelay: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    action: () => void,
    interactionDelay?: number
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action;

    if (interactionDelay) this.hasDelay = true;
    this.interactionTimer = new Timer(interactionDelay || 0);
  }

  override render(p5: p5, img?: p5.Image): void {
    if (Game.assetsLoaded && img) {
      p5.image(img, this.x, this.y, this.width, this.height);
    }
  }

  onClick(x: number, y: number): void {
    if (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    ) {
      if (this.hasDelay && !this.interactionTimer.hasTimeElapsed()) return;
      this.action();

      if (this.hasDelay) {
        this.interactionTimer.reset();
      }
    }
  }
}

export default ClickSection;
