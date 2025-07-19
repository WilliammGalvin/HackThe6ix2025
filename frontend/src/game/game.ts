import p5 from "p5";
import Company from "./company";
import GameSettings from "./game_settings";
import InGameScreen from "./screens/ingame_screen";
import GameScreen from "./screens/screen";

class Game {
  //   settings: GameSettings;
  windowWidth: number;
  windowHeight: number;
  //   currentDay: number;
  //   globalWaterLevel: number;
  //   companies: Company[];

  currentScreen: GameScreen;

  //   constructor(settings: GameSettings) {
  //     this.settings = settings;
  //     this.currentDay = settings.startingDay;
  //     this.globalWaterLevel = settings.startingWaterLevel;
  //     this.companies = [];

  //     this.currentScreen = new InGameScreen(this);
  //   }

  constructor(windowWidth: number, windowHeight: number) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.currentScreen = new InGameScreen(this);
  }

  runGame(p5: p5): void {
    if (this.isWaterEmpty()) {
      // Handle game over logic
    }

    this.currentScreen.update();
    this.currentScreen.render(p5);
  }

  onMouseClick(x: number, y: number): void {
    this.currentScreen.onMouseClick(x, y);
  }

  onKeyPress(key: string): void {
    this.currentScreen.onKeyPress(key);
  }

  //   incrementDay(): void {
  //     this.currentDay++;
  //   }

  isWaterEmpty(): boolean {
    return false;
    //   return this.globalWaterLevel <= 0;
  }

  //   drainWater(amount: number): void {
  //     this.globalWaterLevel -= amount;

  //     if (this.globalWaterLevel < 0) {
  //       this.globalWaterLevel = 0;
  //     }
  //   }
}

export default Game;
