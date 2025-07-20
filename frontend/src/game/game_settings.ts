class GameSettings {
  startingDay: number = 1;
  startingWaterLevel: number = 1000000;
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
  static miningSpeedDeviation: number = 5000;
  static buildingSpeedDeviation: number = 7000;
  static researchSpeedDeviation: number = 15000;
  static payIntervalDeviation: number = 5000;

  miningSpeed: number;
  buildingSpeed: number;
  researchSpeed: number;
  payInterval: number;

  constructor(
    miningSpeed: number,
    buildingSpeed: number,
    researchSpeed: number,
    payInterval: number
  ) {
    this.miningSpeed = miningSpeed;
    this.buildingSpeed = buildingSpeed;
    this.researchSpeed = researchSpeed;
    this.payInterval = payInterval;
  }
}

export default GameSettings;
export { CompanyAISettings };
