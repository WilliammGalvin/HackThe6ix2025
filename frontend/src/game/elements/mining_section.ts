import p5 from "p5";
import ClickSection from "../click_section";
import GameElement from "./element";
import Clickable from "../clickable";

class MiningSection extends GameElement implements Clickable {
  x: number;
  y: number;
  width: number;
  height: number;

  clickSection: ClickSection;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.clickSection = new ClickSection(
      x + width / 4,
      y + height / 4,
      width / 2,
      height / 2,
      this.onMine.bind(this)
    );
  }

  onMine(): void {
    alert("Mined 10 ore!");
  }

  override render(p5: p5): void {
    p5.fill(200);
    p5.rect(this.x, this.y, this.width, this.height);
  }

  override update(): void {
    // Implement update logic for the mining section
  }

  onMouseClick(x: number, y: number): void {
    this.clickSection.onClick(x, y);
  }
}

export default MiningSection;
