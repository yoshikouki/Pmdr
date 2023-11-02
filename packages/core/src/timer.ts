import { TimerInterface } from "./pmdr";

export class Timer implements TimerInterface {
  private duration: number;
  private callback: () => void;
  private currentTimeout: NodeJS.Timeout | null = null;

  constructor(duration: number, callback: () => void) {
    this.duration = duration;
    this.callback = callback;
  }

  start(): void {
    if (this.currentTimeout) return;

    this.currentTimeout = setTimeout(() => {
      this.callback();
      this.currentTimeout = null;
    }, this.duration);
  }

  stop(): void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }
}
