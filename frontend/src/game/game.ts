import p5 from "p5";
import Company from "./company";
import GameSettings from "./game_settings";
import InGameScreen from "./screens/ingame_screen";
import GameScreen from "./screens/screen";
import Timer from "./timer";
import CompanyAI from "./company_ai";

class Game {
  static assets: {
    rockImage?: p5.Image;
    dataCenterImage?: p5.Image;
    bottleImage?: p5.Image;
  } = {};

  static assetsLoaded: boolean = false;

  static loadAssets(p5: p5): void {
    let loaded = 0;
    const total = 3;

    p5.loadImage("assets/rock.png", (img) => {
      Game.assets.rockImage = img;
      loaded++;

      if (loaded === total) {
        Game.assetsLoaded = true;
      }
    });

    p5.loadImage("assets/data_center.png", (img) => {
      Game.assets.dataCenterImage = img;
      loaded++;

      if (loaded === total) {
        Game.assetsLoaded = true;
      }
    });

    p5.loadImage("assets/bottle.png", (img) => {
      Game.assets.bottleImage = img;
      loaded++;

      if (loaded === total) {
        Game.assetsLoaded = true;
      }
    });
  }

  p5: p5;
  settings: GameSettings;
  windowWidth: number;
  windowHeight: number;
  currentDay: number;
  globalWaterLevel: number;
  playerCompany: Company;
  companiesAIs: CompanyAI[];

  currentScreen: GameScreen;
  playerPayTimer: Timer;

  gameTime: number;
  dayTimeDelta: number;
  dayTimer: Timer;

  constructor(p5: p5, windowWidth: number, windowHeight: number) {
    this.p5 = p5;
    this.settings = new GameSettings();
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.currentDay = this.settings.startingDay;
    this.globalWaterLevel = this.settings.startingWaterLevel;
    this.playerCompany = new Company("Player Company", this);

    this.companiesAIs = Array.from(
      { length: this.settings.maxCompanies },
      (_, i) => {
        return new CompanyAI(
          new Company(`Company ${i + 1}`, this),
          this.settings
        );
      }
    );

    this.currentScreen = new InGameScreen(this);

    this.playerPayTimer = new Timer(this.settings.payInterval, () => {
      this.playerCompany.generateRevenue();
    });

    this.gameTime = this.settings.dayStartTime;
    this.dayTimeDelta = this.settings.dayEndTime - this.settings.dayStartTime;
    this.dayTimer = new Timer(3000, this.tickTime.bind(this));
  }

  runGame(p5: p5): void {
    if (!this.isWaterEmpty()) {
      this.update();
    }

    this.render(p5);
  }

  update(): void {
    this.playerPayTimer.runTimer();
    this.dayTimer.runTimer();

    for (const company of this.companiesAIs) {
      company.runCompanyAI();
    }

    this.currentScreen.update();
  }

  render(p5: p5): void {
    p5.clear();
    this.currentScreen.render(p5);
  }

  onMouseClick(x: number, y: number): void {
    this.currentScreen.onMouseClick(x, y);
  }

  onKeyPress(key: string): void {
    this.currentScreen.onKeyPress(key);
  }

  payCompanies(): void {
    this.playerCompany.generateRevenue();
  }

  tickTime(): void {
    if (this.gameTime >= this.settings.dayEndTime) {
      this.startNewDay();
    } else {
      this.gameTime += 1;
    }
  }

  startNewDay(): void {
    this.incrementDay();
    this.gameTime = this.settings.dayStartTime;
  }

  incrementDay(): void {
    this.currentDay++;
  }

  isWaterEmpty(): boolean {
    return this.globalWaterLevel <= 0;
  }

  drainWater(amount: number): void {
    this.globalWaterLevel -= amount;

    if (this.globalWaterLevel < 0) {
      this.globalWaterLevel = 0;
    }
  }
}

export default Game;
