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
      x + width * 0.3,
      y + height - 45,
      width * 0.4,
      20,
      this.clickSection.interactionTimer
    );
  }

  onMine(): void {
    this.game.playerCompany.mineMaterials();
  }

  override render(p5: p5): void {
    super.render(p5);
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
