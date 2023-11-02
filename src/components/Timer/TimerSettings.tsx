import { TimerSettingsProps } from ".";

export const TimerSettings = ({ minutes, onChange }: TimerSettingsProps) => {
  return <input type="number" value={minutes} onChange={onChange} />;
};
