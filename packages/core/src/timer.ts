export type TimerState = "Ready" | "Running" | "Paused" | "Finished" | "Reset";

export type Timer =
  | ReadyTimer
  | RunningTimer
  | PausedTimer
  | FinishedTimer
  | ResetTimer;

export type TimerAttributes =
  | ReadyTimerAttributes
  | RunningTimerAttributes
  | PausedTimerAttributes
  | FinishedTimerAttributes
  | ResetTimerAttributes;

export type SetupTimerAttributes = {
  label: string;
  duration: number;
  interval?: number;
  alarm?: Alarm;
};

type BaseTimerMethods = {
  start: () => void;
  getRemainingDuration: () => number;
  isReady(): boolean;
  isRunning(): boolean;
  isPaused(): boolean;
  isFinished(): boolean;
  isReset(): boolean;
};

type ReadyTimerAttributes = SetupTimerAttributes & {
  state: "Ready";
};
type ReadyTimerMethods = BaseTimerMethods;
export type ReadyTimer = ReadyTimerAttributes & ReadyTimerMethods;

type RunningTimerAttributes = SetupTimerAttributes & {
  state: "Running";
  startTime: Date;
  endTime: Date;
  pauseIntervals: PauseInterval[];
};
type RunningTimerMethods = BaseTimerMethods & {
  pause: () => void;
  reset: () => void;
  finish: () => void;
};
export type RunningTimer = RunningTimerAttributes & RunningTimerMethods;

type PausedTimerAttributes = SetupTimerAttributes & {
  state: "Paused";
  startTime: Date;
  pauseIntervals: PauseInterval[];
};
type PausedTimerMethods = BaseTimerMethods & {
  resume: () => void;
  reset: () => void;
};
export type PausedTimer = PausedTimerAttributes & PausedTimerMethods;

type FinishedTimerAttributes = SetupTimerAttributes & {
  state: "Finished";
  startTime: Date;
  endTime: Date;
  pauseIntervals: PauseInterval[];
};
type FinishedTimerMethods = BaseTimerMethods & {
  reset: () => void;
};
export type FinishedTimer = FinishedTimerAttributes & FinishedTimerMethods;

type ResetTimerAttributes = SetupTimerAttributes & {
  state: "Reset";
};
type ResetTimerMethods = BaseTimerMethods;
export type ResetTimer = ResetTimerAttributes & ResetTimerMethods;

export type Alarm = {
  sound: string;
  vibration: boolean;
  message: string;
  run: () => void;
};

export type PauseInterval = {
  pauseTime: Date;
  resumeTime?: Date;
};

const startTimer = (attr: TimerAttributes): RunningTimer => {
  const runningTimerAttributes: RunningTimerAttributes = {
    ...attr,
    state: "Running",
    startTime: new Date(),
    endTime: new Date(Date.now() + attr.duration),
    pauseIntervals: [],
  };
  return {
    ...runningTimerAttributes,
    start: () => startTimer(runningTimerAttributes),
    pause: () => pauseTimer(runningTimerAttributes),
    reset: () => resetTimer(runningTimerAttributes),
    finish: () => finishTimer(runningTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(runningTimerAttributes),
    isReady: () => isReady(runningTimerAttributes),
    isRunning: () => isRunning(runningTimerAttributes),
    isPaused: () => isPaused(runningTimerAttributes),
    isFinished: () => isFinished(runningTimerAttributes),
    isReset: () => isReset(runningTimerAttributes),
  };
};

const finishTimer = (attr: RunningTimerAttributes): FinishedTimer => {
  const finishedTimerAttributes: FinishedTimerAttributes = {
    ...attr,
    state: "Finished",
  };
  return {
    ...finishedTimerAttributes,
    start: () => startTimer(finishedTimerAttributes),
    reset: () => resetTimer(finishedTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(finishedTimerAttributes),
    isReady: () => isReady(finishedTimerAttributes),
    isRunning: () => isRunning(finishedTimerAttributes),
    isPaused: () => isPaused(finishedTimerAttributes),
    isFinished: () => isFinished(finishedTimerAttributes),
    isReset: () => isReset(finishedTimerAttributes),
  };
};

const pauseTimer = (attr: RunningTimerAttributes): PausedTimer => {
  const isAlreadyPaused = attr.pauseIntervals.some(
    (interval) => !interval.resumeTime
  );
  if (isAlreadyPaused) {
    throw new Error("Already paused");
  }
  const pausedTimerAttributes: PausedTimerAttributes = {
    ...attr,
    state: "Paused",
    startTime: new Date(),
    pauseIntervals: [
      ...attr.pauseIntervals,
      {
        pauseTime: new Date(),
      },
    ],
  };
  return {
    ...pausedTimerAttributes,
    start: () => startTimer(pausedTimerAttributes),
    resume: () => resumeTimer(pausedTimerAttributes),
    reset: () => resetTimer(pausedTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(pausedTimerAttributes),
    isReady: () => isReady(pausedTimerAttributes),
    isRunning: () => isRunning(pausedTimerAttributes),
    isPaused: () => isPaused(pausedTimerAttributes),
    isFinished: () => isFinished(pausedTimerAttributes),
    isReset: () => isReset(pausedTimerAttributes),
  };
};

const resumeTimer = (attr: PausedTimerAttributes): RunningTimer => {
  const pauseIntervals = attr.pauseIntervals.map((interval) => {
    if (interval.resumeTime) return interval;
    return {
      ...interval,
      resumeTime: new Date(),
    };
  });
  const pausingTime = calculatePauseDuration(pauseIntervals);
  const endTime = new Date(
    attr.startTime.getTime() + attr.duration + pausingTime
  );
  const runningTimerAttributes: RunningTimerAttributes = {
    ...attr,
    state: "Running",
    endTime,
    pauseIntervals,
  };
  return {
    ...runningTimerAttributes,
    start: () => startTimer(runningTimerAttributes),
    pause: () => pauseTimer(runningTimerAttributes),
    reset: () => resetTimer(runningTimerAttributes),
    finish: () => finishTimer(runningTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(runningTimerAttributes),
    isReady: () => isReady(runningTimerAttributes),
    isRunning: () => isRunning(runningTimerAttributes),
    isPaused: () => isPaused(runningTimerAttributes),
    isFinished: () => isFinished(runningTimerAttributes),
    isReset: () => isReset(runningTimerAttributes),
  };
};

const resetTimer = (attr: TimerAttributes): ResetTimer => {
  const resetTimerAttributes: ResetTimerAttributes = {
    ...attr,
    state: "Reset",
  };
  return {
    ...resetTimerAttributes,
    start: () => startTimer(resetTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(resetTimerAttributes),
    isReady: () => isReady(resetTimerAttributes),
    isRunning: () => isRunning(resetTimerAttributes),
    isPaused: () => isPaused(resetTimerAttributes),
    isFinished: () => isFinished(resetTimerAttributes),
    isReset: () => isReset(resetTimerAttributes),
  };
};

const calculatePauseDuration = (pauseIntervals: PauseInterval[]): number => {
  return pauseIntervals.reduce(
    (acc, cur) =>
      acc + (cur.resumeTime?.getTime() || Date.now()) - cur.pauseTime.getTime(),
    0
  );
};

const getRemainingDuration = (attr: TimerAttributes) => {
  switch (attr.state) {
    case "Ready":
      return attr.duration;
    case "Running": {
      const { startTime, endTime, pauseIntervals } = attr;
      const pauseDuration = calculatePauseDuration(pauseIntervals);
      return endTime.getTime() - startTime.getTime() - pauseDuration;
    }
    case "Paused": {
      const { startTime, pauseIntervals } = attr;
      const pauseDuration = calculatePauseDuration(pauseIntervals);
      return Date.now() + attr.duration + startTime.getTime() - pauseDuration;
    }
    case "Finished":
      return 0;
    case "Reset":
      return attr.duration;
  }
};

const isReady = (attr: TimerAttributes) => attr.state === "Ready";
const isRunning = (attr: TimerAttributes) => attr.state === "Running";
const isPaused = (attr: TimerAttributes) => attr.state === "Paused";
const isFinished = (attr: TimerAttributes) => attr.state === "Finished";
const isReset = (attr: TimerAttributes) => attr.state === "Reset";

export const initializeTimer = (attr: SetupTimerAttributes): ReadyTimer => {
  const readyTimerAttributes: ReadyTimerAttributes = {
    ...attr,
    state: "Ready",
  };
  return {
    ...readyTimerAttributes,
    start: () => startTimer(readyTimerAttributes),
    getRemainingDuration: () => getRemainingDuration(readyTimerAttributes),
    isReady: () => isReady(readyTimerAttributes),
    isRunning: () => isRunning(readyTimerAttributes),
    isPaused: () => isPaused(readyTimerAttributes),
    isFinished: () => isFinished(readyTimerAttributes),
    isReset: () => isReset(readyTimerAttributes),
  };
};
