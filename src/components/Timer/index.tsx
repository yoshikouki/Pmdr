"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AudioManager } from "./AudioManager";
import { TimerControls } from "./TimerControls";
import { TimerDisplay } from "./TimerDisplay";
import { TimerSettings } from "./TimerSettings";

export type TimerSettingsProps = {
  minutes: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export type AudioManagerProps = {
  audioFile: string;
  isFinished: boolean;
};
export type TimerDisplayProps = {
  minutes: number;
  seconds: number;
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
    const value = event.target.value;
    setMinutes(parseInt(value) || 0);
    setSeconds(0);
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
      <TimerSettings minutes={minutes} onChange={handleChangeTime} />
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <TimerControls
        isActive={isActive}
        onStartStop={handleStartStop}
        onReset={handleReset}
      />
      <AudioManager
        isFinished={minutes === 0 && seconds === 0}
        audioFile={audioFile}
      />

      <h2 className={`mb-3 text-2xl font-black`}>25:00</h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Find in-depth information about Next.js features and API.
      </p>
    </div>
  );
};
