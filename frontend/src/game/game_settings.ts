class GameSettings {
  startingDay: number = 1;
  startingWaterLevel: number = 1000;
  maxCompanies: number = 10;
  startingCash: number = 100;
  startingMaterials: number = 0;

  waterMineDrainRate: number = 1;
  waterCraftDrainRate: number = 2;
  waterBaseResearchDrainRate: number = 0.5;

  miningYield: number = 10;
  researchBaseProfit: number = 100;
}

export default GameSettings;
