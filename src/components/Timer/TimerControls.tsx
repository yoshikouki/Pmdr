import { TimerControlsProps } from ".";

export const TimerControls = ({
  isActive,
  onStartStop,
  onReset,
}: TimerControlsProps) => {
  return (
    <div className="flex w-full items-end justify-center gap-4">
      <button onClick={onStartStop}>{isActive ? "Stop" : "Start"}</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
