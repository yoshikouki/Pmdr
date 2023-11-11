import { usePmdr } from "@/hooks/usePmdr";

export const TimerDisplay = () => {
  const { timers } = usePmdr();

  const padWithZeros = (num: number) => num.toString().padStart(2, "0");

  return (
    <>
      {timers.map((timer, i) => (
        <h2 key={i} className={`mb-3 text-8xl font-black w-screen`}>
          <span className="overflow-visible">
            {/* <input
              type="string"
              name="minutes"
              value={timer.minutes}
              onChange={timer.onChangeDuration}
              className="min-w-10 bg-transparent outline-none text-right whitespace-nowrap"
              style={{ width: `${timer.minutes.toString().length * 4}rem` }}
            />
            :
            <input
              type="string"
              name="seconds"
              value={padWithZeros(timer.seconds)}
              onChange={timer.onChangeDuration}
              className="bg-transparent outline-none text-left"
              style={{ width: `${padWithZeros(timer.seconds).length * 4}rem` }}
            /> */}
            <input
              type="string"
              name="seconds"
              value={timer.duration / 1000}
              onChange={(event) =>
                timer.onChangeDuration(Number(event.target.value) * 1000)
              }
              className="bg-transparent outline-none text-left"
              style={{
                width: `${(timer.duration / 1000).toString().length * 4}rem`,
              }}
            />
          </span>
        </h2>
      ))}
    </>
  );
};
