import p5 from "p5";
import ClickSection from "../click_section";
import Clickable from "../clickable";
import GameSection from "./game_section";
import Game from "../game";
import ProgressBarComp from "./progress_bar";

class BuildingSection extends GameSection implements Clickable {
  clickSection: ClickSection;
  progressBar: ProgressBarComp;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game, x, y, width, height);

    this.clickSection = new ClickSection(
      x + width / 4,
      y + height / 4,
      width / 2,
      height / 2,
      this.onBuild.bind(this),
      game.settings.buildingInteractionDelay
    );

    this.progressBar = new ProgressBarComp(
      x + 10,
      y + height - 30,
      width - 20,
      20,
      this.clickSection.interactionTimer
    );
  }

  onBuild(): void {
    this.game.playerCompany.buildDataCenter();
  }

  override render(p5: p5): void {
    p5.fill(250, 150, 150);
    p5.rect(this.x, this.y, this.width, this.height);
    this.clickSection.render(p5, Game.assets.dataCenterImage);
    this.progressBar.render(p5);
  }

  override update(): void {
    // Implement update logic for the building section
  }

  onMouseClick(x: number, y: number): void {
    this.clickSection.onClick(x, y);
  }
}

export default BuildingSection;
