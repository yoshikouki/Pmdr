"use client";

import { useEffect, useMemo } from "react";
import { AudioManagerProps } from ".";

export const AudioManager = ({
  audioFile = "se/decide.mp3",
  isFinished,
}: AudioManagerProps) => {
  useEffect(() => {
    const audio = new Audio(audioFile);
    if (isFinished) {
      audio.play();
    }
  }, [isFinished]);
  return null;
};
