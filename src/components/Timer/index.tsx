"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TimerControls } from "./TimerControls";
import { TimerDisplay } from "./TimerDisplay";

export type AudioManagerProps = {
  audioFile: string;
  isFinished: boolean;
};
export type TimerDisplayProps = {
  minutes: number;
  seconds: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export type TimerControlsProps = {
  isActive: boolean;
  onStartStop: () => void;
  onReset: () => void;
};

export const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  const audioFile = useMemo(() => {
    return "se/decide.mp3";
  }, []);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setStartTime(0);
  };

  const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "minutes") {
      const value = parseInt(event.target.value) || 0;
      setMinutes(value);
    } else if (event.target.name === "seconds") {
      const value = parseInt(event.target.value.slice(1, 3)) || 0;
      setSeconds(value);
    } else {
      handleReset();
    }
  };

  const handleFinish = useCallback(() => {
    const audio = new Audio(audioFile);
    audio.play();
    handleReset();
  }, [audioFile]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      setStartTime(Date.now() - (25 * 60 - minutes * 60 - seconds) * 1000);
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const remainingMinutes = Math.floor((25 * 60 - elapsedSeconds) / 60);
        const remainingSeconds = (25 * 60 - elapsedSeconds) % 60;
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
        if (remainingMinutes === 0 && remainingSeconds === 0) {
          handleFinish();
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [handleFinish, isActive, minutes, seconds, startTime]);

  return (
    <div className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        onChange={handleChangeTime}
      />
      <TimerControls
        isActive={isActive}
        onStartStop={handleStartStop}
        onReset={handleReset}
      />
    </div>
  );
};
