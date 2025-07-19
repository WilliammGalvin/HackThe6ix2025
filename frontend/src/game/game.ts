import p5 from "p5";
import Company from "./company";
import GameSettings from "./game_settings";
import InGameScreen from "./screens/ingame_screen";
import GameScreen from "./screens/screen";
import Timer from "./timer";

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
  companies: Company[];

  currentScreen: GameScreen;
  payTimer: Timer;

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
    this.companies = [];

    this.currentScreen = new InGameScreen(this);

    this.payTimer = new Timer(
      this.settings.payInterval,
      this.payCompanies.bind(this)
    );

    this.gameTime = this.settings.dayStartTime;
    this.dayTimeDelta = this.settings.dayEndTime - this.settings.dayStartTime;
    this.dayTimer = new Timer(3000, this.tickTime.bind(this));
  }

  runGame(p5: p5): void {
    if (this.isWaterEmpty()) {
      // Handle game over logic
    }

    this.payTimer.runTimer();
    this.dayTimer.runTimer();

    this.currentScreen.update();
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

    for (const company of this.companies) {
      company.generateRevenue();
    }
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
