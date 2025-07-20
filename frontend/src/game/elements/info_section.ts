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
    super.render(p5);

    p5.fill(0);
    p5.textSize(20);
    p5.textAlign(p5.LEFT, p5.TOP);

    let time = this.game.gameTime;
    time = time > 12 ? time - 12 : time;

    p5.fill(244, 192, 72);
    p5.text("Dashboard", this.x + 25, this.y + 40);

    p5.fill(255);
    p5.text(
      "Materials: " + formatWholeNumber(this.game.playerCompany.materials),
      this.x + 25,
      this.y + 80
    );
    p5.text(
      "Revenue: " + formatCurrency(this.game.playerCompany.cash),
      this.x + 25,
      this.y + 115
    );
    p5.text(
      "Research Level: " + this.game.playerCompany.researchLevel,
      this.x + 25,
      this.y + 150
    );
    p5.text("Current Day: " + this.game.currentDay, this.x + 25, this.y + 185);

    p5.fill(0, 255, 144);
    p5.text(
      "Global Water: " + formatNumber(this.game.globalWaterLevel) + "L",
      this.x + 25,
      this.y + 220
    );

    p5.textAlign(p5.RIGHT, p5.TOP);
    let allCompanies = [
      ...this.game.companiesAIs.map((c) => c.company),
      this.game.playerCompany,
    ];
    allCompanies.sort((a, b) => b.cash - a.cash);

    p5.fill(190);
    allCompanies.forEach((company, index) => {
      if (index >= 3) return;

      p5.text(
        company.name + ": " + formatCurrency(company.cash),
        this.x + this.width - 25,
        this.y + 40 + index * 35
      );
    });
  }

  override update(): void {
    // Implement update logic for the mining section
  }
}

export default InfoSection;
