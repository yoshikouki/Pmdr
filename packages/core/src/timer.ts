export type TimerState = "Ready" | "Running" | "Paused" | "Finished" | "Reset";

export type Timer =
  | ReadyTimer
  | RunningTimer
  | PausedTimer
  | FinishedTimer
  | ResetTimer;

export type TimerArguments = {
  label: string;
  duration: number;
  interval: number;
  alarm: Alarm;
};

interface BaseTimer {
  label: string;
  state: TimerState;
  duration: number;
  interval: number;
  alarm: Alarm;
  start: () => void;
  getRemainingDuration: () => number;
  isReady(): boolean;
  isRunning(): boolean;
  isPaused(): boolean;
  isFinished(): boolean;
  isReset(): boolean;
}

export interface ReadyTimer extends BaseTimer {
  state: "Ready";
}

export interface RunningTimer extends BaseTimer {
  state: "Running";
  startTime: Date;
  endTime: Date;
  pauseIntervals: PauseInterval[];
  pause: () => void;
  reset: () => void;
  finish: () => void;
}

export interface PausedTimer extends BaseTimer {
  state: "Paused";
  startTime: Date;
  pauseIntervals: PauseInterval[];
  resume: () => void;
  reset: () => void;
}

export interface FinishedTimer extends BaseTimer {
  state: "Finished";
  startTime: Date;
  endTime: Date;
  pauseIntervals: PauseInterval[];
  isReady(): false;
  isRunning(): false;
  isPaused(): false;
  isFinished(): true;
  isReset(): false;
}

export interface ResetTimer extends BaseTimer {
  state: "Reset";
  pauseIntervals: PauseInterval[];
  finish: () => void;
  isReady(): false;
  isRunning(): false;
  isPaused(): false;
  isFinished(): false;
  isReset(): true;
}

export interface Alarm {
  sound: string;
  vibration: boolean;
  message: string;
  run: () => void;
}

export interface PauseInterval {
  pauseTime: Date;
  resumeTime?: Date;
}

export const initializeTimer = (arg: TimerArguments): ReadyTimer => {
  const state: TimerState = "Ready";
  const start = () => {};
  const getRemainingDuration = () => 1000;
  const isReady = () => state === "Ready";
  const isRunning = () => state === "Running";
  const isPaused = () => state === "Paused";
  const isFinished = () => state === "Finished";
  const isReset = () => state === "Reset";
  return {
    ...arg,
    state,
    start,
    getRemainingDuration,
    isReady,
    isRunning,
    isPaused,
    isFinished,
    isReset,
  };
};
