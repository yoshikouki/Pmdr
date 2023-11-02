import { useEffect, useMemo, useState } from "react";
import { Pmdr, TimerInterface } from "../../packages/core";

export const usePmdr = () => {
  const [isRunning, setIsRunning] = useState(false);
  const pmdr = useMemo(() => new Pmdr(), []);

  // const duration = 25 * 60 * 1000;
  const duration = 1000;
  const timer: TimerInterface = {
    duration,
    onStart: () => console.log("Timer started", new Date()),
    onStop: () => console.log("Timer stopped", new Date()),
    onFinish: () => {
      new Audio("/se/decide.mp3").play();
      console.log("Timer finished", new Date());
    },
  };

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js");
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data === "timerComplete") {
        pmdr.finish();
      }
    });

    if (!isRunning) return;

    navigator.serviceWorker.getRegistration().then((registration) => {
      registration?.active?.postMessage({
        action: "startTimer",
        duration,
        callback: "timerComplete",
      });
    });
  }, [isRunning, pmdr]);

  const start = () => {
    pmdr.queueForTimer(timer);
    pmdr.startTimer();
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller?.postMessage({
        action: "stopTimer",
      });
    }
  };

  return { start, stop };
};
