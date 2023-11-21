import { Timer } from "./timer";

export type Pmdr = TimerSet;

export type TimerSetState =
  | "Ready"
  | "Running"
  | "Paused"
  | "Finished"
  | "RequireTimer";

type TimerSetAttributes = {
  sequentialTimers: Timer[];
  currentIndex: number;
};
type TimerSetMethods = {
  startNextTimer: () => void;
  resetAllTimer: () => void;
  getCurrentTimer: () => Timer;
  getState: () => TimerSetState;
  hasNextTimer: () => boolean;
};
export type TimerSet = TimerSetAttributes & TimerSetMethods;

const startNext = (attr: TimerSetAttributes): Pmdr => {
  const nextAttr: TimerSetAttributes = {
    ...attr,
    currentIndex: hasNextTimer(attr) ? attr.currentIndex + 1 : 0,
  };
  const nextTimer = getCurrentTimer(nextAttr);
  nextTimer.start();
  return {
    ...nextAttr,
    ...generateTimerSetMethods(attr),
  };
};

const resetAll = (attr: TimerSetAttributes): Pmdr => {
  const nextAttr: TimerSetAttributes = {
    ...attr,
    currentIndex: 0,
    sequentialTimers: [],
  };
  return {
    ...nextAttr,
    ...generateTimerSetMethods(attr),
  };
};

const getCurrentTimer = (attr: TimerSetAttributes): Timer =>
  attr.sequentialTimers[attr.currentIndex];

const stateMapping: Record<string, TimerSetState> = {
  Ready: "Ready",
  Reset: "Ready",
  Running: "Running",
  Paused: "Paused",
  Finished: "Finished",
};

const getState = (attr: TimerSetAttributes): TimerSetState => {
  // const timer = getCurrentTimer(attr);
  // return timer ? stateMapping[timer.state] : "RequireTimer";
  return "RequireTimer";
};

const hasNextTimer = (attr: TimerSetAttributes): boolean =>
  attr.currentIndex + 1 < attr.sequentialTimers.length;

const generateTimerSetMethods = (attr: TimerSetAttributes): TimerSetMethods => {
  return {
    startNextTimer: () => startNext(attr),
    resetAllTimer: () => resetAll(attr),
    getCurrentTimer: () => getCurrentTimer(attr),
    getState: () => getState(attr),
    hasNextTimer: () => hasNextTimer(attr),
  };
};

// export const initializeTimerSet = (timers?: SetupTimerAttributes[]): Pmdr => {
export const initializeTimerSet = (): Pmdr => {
  const attr: TimerSetAttributes = {
    sequentialTimers: [],
    currentIndex: 0,
  };

  return {
    ...attr,
    ...generateTimerSetMethods(attr),
  };
};

export const initializePmdr = initializeTimerSet;
