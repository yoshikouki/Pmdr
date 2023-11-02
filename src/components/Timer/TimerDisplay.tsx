import { TimerDisplayProps } from ".";

export const TimerDisplay = ({
  minutes,
  seconds,
  onChange,
}: TimerDisplayProps) => {
  const secondsString = seconds.toString().padStart(2, "0");

  return (
    <h2 className={`mb-3 text-2xl font-black`}>
      <span className="overflow-visible">
        <input
          type="string"
          name="minutes"
          value={minutes}
          onChange={onChange}
          className="min-w-10 bg-transparent outline-none text-right whitespace-nowrap"
          style={{ width: `${minutes.toString().length}rem` }}
        />
        :
        <input
          type="string"
          name="seconds"
          value={secondsString}
          onChange={onChange}
          className="bg-transparent outline-none text-left"
          style={{ width: `${secondsString.length}rem` }}
        />
      </span>
    </h2>
  );
};
