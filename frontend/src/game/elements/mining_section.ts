import p5 from "p5";
import ClickSection from "../click_section";
import Clickable from "../clickable";
import GameSection from "./game_section";
import Game from "../game";
import ProgressBarComp from "./progress_bar";

class MiningSection extends GameSection implements Clickable {
  clickSection: ClickSection;
  progressBar: ProgressBarComp;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game, x, y, width, height);

    this.clickSection = new ClickSection(
      x + width / 4,
      y + height / 4,
      width / 2,
      height / 2,
      this.onMine.bind(this),
      game.settings.miningInteractionDelay
    );

    this.progressBar = new ProgressBarComp(
      x + 10,
      y + height - 30,
      width - 20,
      20,
      this.clickSection.interactionTimer
    );
  }

  onMine(): void {
    this.game.playerCompany.mineMaterials();
  }

  override render(p5: p5): void {
    p5.fill(150, 150, 250);
    p5.rect(this.x, this.y, this.width, this.height);
    this.clickSection.render(p5, Game.assets.rockImage);
    this.progressBar.render(p5);
  }

  override update(): void {
    // Implement update logic for the mining section
  }

  onMouseClick(x: number, y: number): void {
    this.clickSection.onClick(x, y);
  }
}

export default MiningSection;
