import p5 from "p5";
import Game from "../game";
import GameSection from "./game_section";
import { AIResearchLadder } from "../types";
import { formatCurrency, formatNumber, formatWholeNumber } from "../formatter";

class InfoSection extends GameSection {
  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game, x, y, width, height);
  }

  override render(p5: p5): void {
    p5.fill(116, 185, 255);
    p5.rect(this.x, this.y, this.width, this.height);

    p5.fill(0);
    p5.textSize(16);
    p5.textAlign(p5.LEFT, p5.TOP);

    let time = this.game.gameTime;
    time = time > 12 ? time - 12 : time;

    const text = [
      "Info Section",
      "Materials: " + formatWholeNumber(this.game.playerCompany.materials),
      "Revenue: " + formatCurrency(this.game.playerCompany.cash),
      "Revenue per Cycle: " +
        formatCurrency(this.game.playerCompany.getRevenuePerCycle()),
      "Data Centers: " + this.game.playerCompany.dataCenters,
      "Research Level: " +
        AIResearchLadder[this.game.playerCompany.researchLevel],
      "Water Drain per Cycle: " +
        formatNumber(this.game.playerCompany.getWaterDrainRate()) +
        " L",
      "Current Time: " +
        time +
        ":00 " +
        (this.game.gameTime >= 12 ? "PM" : "AM"),
      "Current Day: " + formatWholeNumber(this.game.currentDay),
      "Global Water: " + formatNumber(this.game.globalWaterLevel) + " L",
    ];

    text.forEach((text, index) => {
      p5.text(text, this.x + 10, this.y + 10 + index * 20);
    });
  }

  override update(): void {
    // Implement update logic for the mining section
  }
}

export default InfoSection;
