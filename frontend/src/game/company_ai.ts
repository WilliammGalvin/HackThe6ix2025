import Company from "./company";
import GameSettings, { CompanyAISettings } from "./game_settings";

class CompanyAI {
  company: Company;
  settings: GameSettings;
  AISettings: CompanyAISettings;

  constructor(company: Company, settings: GameSettings) {
    this.company = company;
    this.settings = settings;
    this.AISettings = this.generateAISettings();
  }

  generateValueFromRange(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  generateAISettings(): CompanyAISettings {
    return new CompanyAISettings(
      this.generateValueFromRange(0, 5000),
      this.generateValueFromRange(0, 5000),
      this.generateValueFromRange(0, 5000)
    );
  }

  runCompanyAI(): void {
    this.mineOre();
    this.buildInfrastructure();
    this.conductResearch();
  }

  mineOre(): void {
    //
  }

  buildInfrastructure(): void {
    //
  }

  conductResearch(): void {
    //
  }
}

export default CompanyAI;
