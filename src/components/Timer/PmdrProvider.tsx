"use client";

import { ReactNode, createContext, useContext } from "react";
import { initializePmdr } from "../../../packages/core";

const PmdrContext = createContext({
  pmdr: initializePmdr(),
});

export const PmdrProvider = ({ children }: { children: ReactNode }) => {
  const pmdr = initializePmdr();
  return (
    <PmdrContext.Provider value={{ pmdr }}>{children}</PmdrContext.Provider>
  );
};

export const usePmdrContext = () => useContext(PmdrContext);
