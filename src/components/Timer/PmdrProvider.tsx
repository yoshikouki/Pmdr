"use client";

import { initializePmdr } from "@pmdr/core";
import { ReactNode, createContext, useContext, useEffect } from "react";

const PmdrContext = createContext({
  pmdr: initializePmdr(),
});

export const PmdrProvider = ({ children }: { children: ReactNode }) => {
  const pmdr = initializePmdr();

  useEffect(() => {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      registration.addEventListener("message", (event) => {
        console.log("message on registered", event.data);
      });
    });
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("message", event.data.action);
    });
  }, []);

  return (
    <PmdrContext.Provider value={{ pmdr }}>{children}</PmdrContext.Provider>
  );
};

export const usePmdrContext = () => useContext(PmdrContext);
