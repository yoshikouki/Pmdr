"use client";

import { TimerControls } from "./TimerControls";
import { TimerDisplay } from "./TimerDisplay";

export const Timer = () => {
  return (
    <div className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <TimerDisplay />
      <TimerControls />
    </div>
  );
};
