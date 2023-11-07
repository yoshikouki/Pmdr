import { usePmdr } from "@/hooks/usePmdr";

export const TimerControls = () => {
  const { onStart, onStop, onReset, isRunning } = usePmdr();

  return (
    <div className="flex w-full items-end justify-center gap-4">
      {isRunning ? (
        <button onClick={onStop}>Stop</button>
      ) : (
        <button onClick={onStart}>Start</button>
      )}

      <button onClick={onReset}>Reset</button>
    </div>
  );
};
