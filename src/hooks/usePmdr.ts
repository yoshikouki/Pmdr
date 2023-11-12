import { usePmdrContext } from "@/components/Timer/PmdrProvider";
import { Timer, createTimer } from "@pmdr/core";

export const usePmdr = () => {
  const context = usePmdrContext();
  if (!context) {
    throw new Error("usePmdr must be used within a PmdrProvider");
  }
  const { pmdr } = context;

  const timer: Timer = createTimer({
    name: "Pomodoro Timer",
    duration: 1000,
    // duration: 25 * 60 * 1000,
    // onStart: () => console.log("Timer started", new Date()),
    // onStop: () => console.log("Timer stopped", new Date()),
    // onFinish: () => {
    //   new Audio("/se/decide.mp3").play();
    //   console.log("Timer finished", new Date());
    // },
  });

  const onStart = () => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.controller?.postMessage({ command: "stopTimer" });
  };

  const onStop = () => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.controller?.postMessage({ command: "stopTimer" });
  };

  return {
    onStart,
    onStop,
    onReset: pmdr.resetAllTimer,
    isRunning: pmdr.getState() === "Running",
    timers: [timer],
  };
};
