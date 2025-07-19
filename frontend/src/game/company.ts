import Game from "./game";
import {
  AIResearchLadder,
  AIResearchLevel,
  AIResearchMultipliers,
  AIResearchRequirements,
} from "./types";

class Company {
  name: string;
  game: Game;
  cash: number;
  materials: number;
  researchLevel: number;
  dataCenters: number;

  constructor(name: string, game: Game) {
    this.name = name;
    this.game = game;
    this.cash = game.settings.startingCash;
    this.materials = game.settings.startingMaterials;
    this.researchLevel = game.settings.startingResearchLevel;
    this.dataCenters = game.settings.startingDataCenters;
  }

  mineMaterials(): void {
    this.materials += this.game.settings.miningYield;
    this.game.drainWater(this.game.settings.waterMineDrainRate);
  }

  buildDataCenter(): void {
    if (this.materials >= this.game.settings.dataCenterCost) {
      this.materials -= this.game.settings.dataCenterCost;
      this.dataCenters++;
    }
  }

  researchAI(): void {
    if (this.researchLevel >= AIResearchLadder.length - 1) {
      return;
    }

    const researchCost = AIResearchRequirements.get(this.getResearchLevel())!;

    if (this.dataCenters >= researchCost) {
      this.researchLevel++;

      const baseDrainRate = this.game.settings.waterBaseResearchDrainRate;
      const drainRateMultiplier = AIResearchMultipliers.get(
        this.getResearchLevel()
      )!;
      this.game.drainWater(baseDrainRate * drainRateMultiplier);
    }
  }

  getResearchLevel(): AIResearchLevel {
    return AIResearchLadder[this.researchLevel];
  }

  getWaterDrainRate(): number {
    return (
      this.game.settings.waterBaseResearchDrainRate *
      AIResearchMultipliers.get(this.getResearchLevel())! *
      this.dataCenters
    );
  }

  getRevenuePerCycle(): number {
    if (this.dataCenters <= 0) return 0;

    const multiplier = AIResearchMultipliers.get(this.getResearchLevel())!;
    return (
      this.dataCenters * this.game.settings.researchBaseProfit * multiplier
    );
  }

  generateRevenue(): void {
    this.cash += this.getRevenuePerCycle();
    this.game.drainWater(this.getWaterDrainRate());
  }
}

export default Company;
