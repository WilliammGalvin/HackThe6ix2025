import p5 from "p5";
import ClickSection from "../click_section";
import Clickable from "../clickable";
import GameSection from "./game_section";
import Game from "../game";

class ResearchSection extends GameSection implements Clickable {
  clickSection: ClickSection;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game, x, y, width, height);

    this.clickSection = new ClickSection(
      x + width / 4,
      y + height / 4,
      width / 2,
      height / 2,
      this.onMine.bind(this),
      game.settings.researchInteractionDelay
    );
  }

  onMine(): void {
    this.game.playerCompany.researchAI();
  }

  override render(p5: p5): void {
    p5.fill(200, 250, 150);
    p5.rect(this.x, this.y, this.width, this.height);
    this.clickSection.render(p5, Game.assets.bottleImage);
  }

  override update(): void {
    // Implement update logic for the building section
  }

  onMouseClick(x: number, y: number): void {
    this.clickSection.onClick(x, y);
  }
}

export default ResearchSection;
