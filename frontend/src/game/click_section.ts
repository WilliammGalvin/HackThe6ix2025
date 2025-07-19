import GameElement from "./elements/element";

class ClickSection extends GameElement {
  x: number;
  y: number;
  width: number;
  height: number;
  action: () => void;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    action: () => void
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action;
  }

  onClick(x: number, y: number): void {
    console.log(`ClickSection clicked at (${x}, ${y})`);

    if (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    ) {
      this.action();
    }
  }
}

export default ClickSection;
