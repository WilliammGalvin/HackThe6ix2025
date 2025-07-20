import p5 from "p5";
import GameElement from "../elements/element";
import GameScreen from "./screen";
import Game from "../game";
import MiningSection from "../elements/mining_section";
import { isClickable } from "../clickable";
import BuildingSection from "../elements/building_section";
import ResearchSection from "../elements/research_section";
import InfoSection from "../elements/info_section";

class InGameScreen extends GameScreen {
  game: Game;
  elements: GameElement[] = [];

  constructor(game: Game) {
    super();
    this.game = game;

    const halfWidth = game.windowWidth / 2;
    const halfHeight = game.windowHeight / 2;

    this.addElement(new MiningSection(game, 0, 0, halfWidth, halfHeight));
    this.addElement(
      new BuildingSection(game, halfWidth, 0, halfWidth, halfHeight)
    );
    this.addElement(
      new ResearchSection(game, 0, halfHeight, halfWidth, halfHeight)
    );
    this.addElement(
      new InfoSection(game, halfWidth, halfHeight, halfWidth, halfHeight)
    );
  }

  addElement(element: GameElement): void {
    this.elements.push(element);
  }

  override render(p5: p5): void {
    if (!Game.assetsLoaded) return;
    p5.image(
      Game.assets.backgroundImage!,
      0,
      0,
      this.game.windowWidth,
      this.game.windowHeight
    );

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
      }
    }
  }
}

export default InGameScreen;
