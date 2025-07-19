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
}

export default GameSection;
