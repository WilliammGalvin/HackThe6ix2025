import p5 from "p5";
import Game from "../game";
import GameElement from "./element";

class GameSection extends GameElement {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super();
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  override render(p5: p5): void {
    const margin = 10;

    p5.fill(13, 29, 53, 120);
    p5.noStroke();
    p5.rect(
      this.x + margin,
      this.y + margin,
      this.width - margin * 2,
      this.height - margin * 2,
      15
    );

    p5.noFill();
    p5.stroke(43, 131, 160);
    p5.strokeWeight(3);
    p5.rect(
      this.x + margin,
      this.y + margin,
      this.width - margin * 2,
      this.height - margin * 2,
      15
    );

    p5.noStroke();
  }
}

export default GameSection;
