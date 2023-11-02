import { TimerDisplayProps } from ".";

export const TimerDisplay = ({ minutes, seconds }: TimerDisplayProps) => {
  return (
    <h1>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </h1>
  );
};
