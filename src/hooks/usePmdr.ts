import { usePmdrContext } from "@/components/Timer/PmdrProvider";
import { useEffect } from "react";
import { SetupTimerAttributes } from "../../packages/core";

export const usePmdr = () => {
  const context = usePmdrContext();
  if (!context) {
    throw new Error("usePmdr must be used within a PmdrProvider");
  }
  const { pmdr } = context;

  const timers: SetupTimerAttributes[] = [
    {
      label: "Pomodoro Timer",
      duration: 1000,
      // duration: 25 * 60 * 1000,
      // onStart: () => console.log("Timer started", new Date()),
      // onStop: () => console.log("Timer stopped", new Date()),
      // onFinish: () => {
      //   new Audio("/se/decide.mp3").play();
      //   console.log("Timer finished", new Date());
      // },
    },
    {
      label: "Short Break",
      duration: 5 * 60 * 1000,
    },
  ];

  pmdr.queueTimers(timers);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let currentTimer: NodeJS.Timeout;
    navigator.serviceWorker.register("/sw.js");
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.action === "startTimer") {
        const timer = pmdr.getCurrentTimer();
        const runningTimer = timer.start();
        console.log(runningTimer);
        currentTimer = setTimeout(() => {
          runningTimer.finish();
          pmdr.startNextTimer();
        }, timer.interval);
      } else if (event.data.action === "stopTimer") {
        clearTimeout(currentTimer);
      }
    });
    return () => clearTimeout(currentTimer);
  }, []);

  const onStart = () => {
    const timer = pmdr.getCurrentTimer();
    console.log(timer);
    const runningTimer = timer.start();
    const interval = setInterval(() => {
      runningTimer.finish();
      pmdr.startNextTimer();
      if (!pmdr.hasNextTimer()) {
        clearInterval(interval);
      }
    }, timer.interval);
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistration().then((registration) => {
      registration?.active?.postMessage({
        action: "startTimer",
        callbackMessage: "timerComplete",
      });
    });
  };

  const onStop = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller?.postMessage({
        action: "stopTimer",
      });
    }
  };

  return {
    onStart,
    onStop,
    onReset: pmdr.resetAllTimer,
    isRunning: pmdr.getState() === "Running",
    timers: pmdr.sequentialTimers,
  };
};
