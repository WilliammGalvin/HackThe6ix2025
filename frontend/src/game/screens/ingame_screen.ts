import p5 from "p5";
import GameElement from "../elements/element";
import GameScreen from "./screen";
import Game from "../game";
import MiningSection from "../elements/mining_section";
import Clickable, { isClickable } from "../clickable";

class InGameScreen extends GameScreen {
  game: Game;
  elements: GameElement[] = [];

  constructor(game: Game) {
    super();
    this.game = game;

    this.addElement(
      new MiningSection(0, 0, game.windowWidth / 2, game.windowHeight / 2)
    );
  }

  addElement(element: GameElement): void {
    this.elements.push(element);
  }

  override render(p5: p5): void {
    for (const element of this.elements) {
      element.render(p5);
    }
  }

  override update(): void {
    for (const element of this.elements) {
      element.update();
    }
  }

  override onMouseClick(x: number, y: number): void {
    for (const element of this.elements) {
      if (isClickable(element)) {
        element.onMouseClick(x, y);
        console.log("Clickable!");
      }
    }
  }
}

export default InGameScreen;
