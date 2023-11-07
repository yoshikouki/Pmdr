import { createContext, useEffect, useReducer } from "react";
import { Pmdr, Timer } from "../../packages/core";
import { usePmdrContext } from "@/components/Timer/PmdrProvider";

export const usePmdr = (initialState: Pmdr) => {
  const context = usePmdrContext();
  if (!context) {
    throw new Error("usePmdr must be used within a PmdrProvider");
  }
  const { pmdr, dispatch } = context;
  // const [pmdr, dispatch] = useReducer(timerReducer, initialState);

  // const duration = 25 * 60 * 1000;
  const duration = 1000;
  const timer: Timer = {
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

    let currentTimer: NodeJS.Timeout;
    navigator.serviceWorker.register("/sw.js");
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.action === "startTimer") {
        const { duration, callback } = event.data;
        currentTimer = setTimeout(() => {
          navigator.serviceWorker.controller?.postMessage(callback);
        }, duration);
      } else if (event.data.action === "stopTimer") {
        clearTimeout(currentTimer);
      } else if (event.data === "timerComplete") {
        pmdr.finish();
      }
    });
    return () => clearTimeout(currentTimer);
  }, [pmdr]);

  useEffect(() => {
    if (!("serviceWorker" in navigator && isRunning)) return;

    navigator.serviceWorker.getRegistration().then((registration) => {
      registration?.active?.postMessage({
        action: "startTimer",
        duration,
        callback: "timerComplete",
      });
    });
  }, [isRunning]);

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
