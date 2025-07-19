class GameSettings {
  startingDay: number = 1;
  startingWaterLevel: number = 1000;
  maxCompanies: number = 10;
  startingCash: number = 100;
  startingMaterials: number = 0;
  startingDataCenters: number = 0;
  startingResearchLevel: number = 0;

  dayStartTime: number = 9;
  dayEndTime: number = 17;

  waterMineDrainRate: number = 1;
  waterCraftDrainRate: number = 2;
  waterBaseResearchDrainRate: number = 0.5;
  payInterval: number = 5000;

  miningYield: number = 10;
  dataCenterCost: number = 50;
  researchBaseProfit: number = 100;

  miningInteractionDelay: number = 500;
  buildingInteractionDelay: number = 5000;
  researchInteractionDelay: number = 10000;
}

class CompanyAISettings {
  miningSpeedDeviation: number;
  buildingSpeedDeviation: number;
  researchSpeedDeviation: number;

  constructor(
    miningSpeedDeviation: number,
    buildingSpeedDeviation: number,
    researchSpeedDeviation: number
  ) {
    this.miningSpeedDeviation = miningSpeedDeviation;
    this.buildingSpeedDeviation = buildingSpeedDeviation;
    this.researchSpeedDeviation = researchSpeedDeviation;
  }
}

export default GameSettings;
export { CompanyAISettings };
