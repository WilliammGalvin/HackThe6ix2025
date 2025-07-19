import Company from "./company";
import GameSettings, { CompanyAISettings } from "./game_settings";
import Timer from "./timer";

class CompanyAI {
  company: Company;
  settings: GameSettings;
  AISettings: CompanyAISettings;

  mineTimer: Timer;
  buildTimer: Timer;
  researchTimer: Timer;
  payTimer: Timer;

  constructor(company: Company, settings: GameSettings) {
    this.company = company;
    this.settings = settings;
    this.AISettings = this.generateAISettings();

    this.mineTimer = new Timer(this.AISettings.miningSpeed, () => {
      this.company.mineMaterials();
    });
    this.buildTimer = new Timer(this.AISettings.buildingSpeed, () => {
      this.company.buildDataCenter();
    });
    this.researchTimer = new Timer(this.AISettings.researchSpeed, () => {
      this.company.researchAI();
    });
    this.payTimer = new Timer(this.AISettings.payInterval, () => {
      this.company.generateRevenue();
    });
  }

  generateValueFromDeviation(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  generateAISettings(): CompanyAISettings {
    return new CompanyAISettings(
      this.generateValueFromDeviation(
        this.settings.miningInteractionDelay,
        CompanyAISettings.miningSpeedDeviation
      ),
      this.generateValueFromDeviation(
        this.settings.buildingInteractionDelay,
        CompanyAISettings.buildingSpeedDeviation
      ),
      this.generateValueFromDeviation(
        this.settings.researchInteractionDelay,
        CompanyAISettings.researchSpeedDeviation
      ),
      this.generateValueFromDeviation(
        this.settings.payInterval,
        CompanyAISettings.payIntervalDeviation
      )
    );
  }

  runCompanyAI(): void {
    this.mineTimer.runTimer();
    this.buildTimer.runTimer();
    this.researchTimer.runTimer();
    this.payTimer.runTimer();
  }
}

export default CompanyAI;
