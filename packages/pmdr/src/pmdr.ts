export interface TimerInterface {
  start(): void;
  stop(): void;
}

export type TimerConfig = {
  timer: TimerInterface;
  callback: () => void;
};

export class Pmdr {
  private queue: TimerConfig[];
  private currentTimer: TimerInterface | null = null;

  constructor() {
    this.queue = [];
  }

  // タイマーをキューに追加
  addTimer(timer: TimerInterface, callback: () => void): void {
    this.queue.push({ timer, callback });
  }

  // タイマーを開始
  start(): void {
    if (this.queue.length === 0 || this.currentTimer) return;

    const { timer, callback } = this.queue.shift()!;
    this.currentTimer = timer;
    this.currentTimer.start();
    callback();
  }

  // 現在のタイマーを停止
  stop(): void {
    this.currentTimer?.stop();
    this.currentTimer = null;
  }
}
