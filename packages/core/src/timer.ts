import { TimerInterface } from "./pmdr";

export class Timer {
  public duration: number;
  public currentTimeout?: NodeJS.Timeout;
  private onStart: () => void;
  private onStop: () => void;
  private onFinish: () => void;

  constructor({ duration, onStart, onStop, onFinish }: TimerInterface) {
    this.duration = duration;
    this.onStart = onStart;
    this.onStop = onStop;
    this.onFinish = onFinish;
  }

  start(): void {
    if (this.currentTimeout) {
      throw new Error("Timer is already running");
    }

    this.currentTimeout = setTimeout(() => this.finish(), this.duration);
    this.onStart();
  }

  stop(): void {
    this.clear();
    this.onStop();
  }

  finish(): void {
    this.clear();
    this.onFinish();
  }

  clear(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }
}
