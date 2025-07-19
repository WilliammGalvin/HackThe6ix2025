import { AIResearchLevel } from "./types";

class Company {
  name: string;
  game: Game;
  cash: number;
  materials: number;
  researchLevel: AIResearchLevel;

  constructor(name: string, game: Game) {
    this.name = name;
    this.game = game;
    this.cash = game.settings.startingCash;
    this.materials = game.settings.startingMaterials;
    this.researchLevel = AIResearchLevel.GPT_1;
  }

  mineMaterials(): void {
    this.materials += this.game.settings.miningYield;
    this.game.drainWater(this.game.settings.waterMineDrainRate);
  }
}

export default Company;
