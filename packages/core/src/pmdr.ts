import { Timer } from "..";

export interface TimerInterface {
  duration: number;
  onStart(): void;
  onStop(): void;
  onFinish(): void;
}

export class Pmdr {
  private queue: Timer[];
  public currentTimer: Timer | null = null;

  constructor() {
    this.queue = [];
  }

  queueForTimer(timer: TimerInterface): Pmdr {
    this.queue.push(new Timer(timer));
    return this;
  }

  startTimer(): Pmdr {
    if (this.queue.length === 0 || this.currentTimer) return;

    const timer = this.queue.shift()!;
    this.currentTimer = timer;
    this.currentTimer.start();
    return this;
  }

  stopTimer(): void {
    this.currentTimer?.stop();
    this.currentTimer = null;
  }

  finish(): void {
    this.currentTimer?.finish();
    this.currentTimer = null;
  }
}
