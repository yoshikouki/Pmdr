export interface Timer {
  startTime?: Date;
  duration: number;
  interval: number;
  remainingTime: number;
  isRunning: boolean;
  name?: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  onChangeDuration: (newDuration: number) => void;
  updateInterval: (newInterval: number) => void;
}

type SetupTimerArgs = {
  duration: number;
  name?: string;
  interval?: number;
};

export const createTimer = ({
  duration,
  name,
  interval = 1000,
}: SetupTimerArgs): Timer => {
  let timerId: NodeJS.Timeout | null = null;
  let remainingTime = duration;
  let isRunning = false;
  let startTime: Date | undefined = undefined;

  const start = () => {
    if (isRunning) return;
    isRunning = true;
    startTime = new Date();
    timerId = setInterval(() => {
      remainingTime -= interval;
      if (remainingTime <= 0) {
        clearInterval(timerId!);
        isRunning = false;
        remainingTime = 0;
        console.log("Timer finished", new Date());
      }
    }, interval);
  };

  const pause = () => {
    if (!isRunning) return;
    clearInterval(timerId!);
    isRunning = false;
  };

  const reset = () => {
    if (isRunning) {
      clearInterval(timerId!);
    }
    isRunning = false;
    startTime = undefined;
    remainingTime = duration;
  };

  const onChangeDuration = (newDuration: number) => {
    if (isRunning) return;
    duration = newDuration;
    remainingTime = duration;
  };

  const updateInterval = (newInterval: number) => {
    if (isRunning) return;
    interval = newInterval;
  };

  return {
    startTime,
    duration,
    interval,
    remainingTime,
    isRunning,
    name,
    start,
    pause,
    reset,
    onChangeDuration,
    updateInterval,
  };
};
