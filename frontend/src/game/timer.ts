class Timer {
  last: number;
  delay: number;
  onTick?: () => void;

  constructor(delay: number, onTick?: () => void) {
    this.last = Date.now();
    this.delay = delay;
    this.onTick = onTick;
  }

  hasTimeElapsed(): boolean {
    return Date.now() - this.last >= this.delay;
  }

  reset(): void {
    this.last = Date.now();
  }

  runTimer(): void {
    if (!this.onTick) return;

    if (this.hasTimeElapsed()) {
      this.onTick();
      this.reset();
    }
  }

  getProgress(): number {
    const progress = (Date.now() - this.last) / this.delay;
    return Math.min(progress, 1);
  }
}

export default Timer;
