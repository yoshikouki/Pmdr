import { Timer, TimerArguments, TimerState, initializeTimer } from "./timer";

export type Pmdr = TimerSet;

export type TimerSetState = "Ready" | "Running" | "Paused" | "Finished";

export interface TimerSet {
  sequentialTimers: Timer[];
  currentIndex: number;
  startNextTimer: () => void;
  resetAllTimer: () => void;
  getCurrentTimer: () => Timer;
  getState: () => TimerSetState;
  hasNextTimer: () => boolean;
}

const stateMapping: Record<TimerState, TimerSetState> = {
  Ready: "Ready",
  Reset: "Ready",
  Running: "Running",
  Paused: "Paused",
  Finished: "Finished",
};

export const initializeTimerSet = (timers?: TimerArguments[]): TimerSet => {
  let sequentialTimers = timers?.map((timer) => initializeTimer(timer)) || [];
  let currentIndex = 0;
  const getCurrentTimer = () => sequentialTimers[currentIndex];
  const getState = () => {
    const { state } = getCurrentTimer();
    return stateMapping[state];
  };
  const hasNextTimer = () => currentIndex + 1 < sequentialTimers.length;

  const startNext = () => {
    if (hasNextTimer()) {
      currentIndex++;
      const nextTimer = getCurrentTimer();
      nextTimer.start();
    } else {
      currentIndex = 0;
    }
  };

  const resetAll = () => {
    currentIndex = 0;
    sequentialTimers = [];
  };

  return {
    sequentialTimers,
    currentIndex,
    startNextTimer: startNext,
    resetAllTimer: resetAll,
    getCurrentTimer,
    getState,
    hasNextTimer,
  };
};
