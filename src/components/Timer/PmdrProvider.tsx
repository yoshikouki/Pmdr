import { ReactNode, createContext, useContext, useReducer } from "react";
import { Pmdr, initializeTimerSet } from "../../../packages/core";

const PmdrContext = createContext(initializeTimerSet());

type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" }
  | { type: "FINISH" }
  | { type: "START_NEXT" }
  | { type: "RESET_ALL" };

const timerReducer = (state: Pmdr, action: TimerAction): Pmdr => {
  switch (action.type) {
    case "START":
      // タイマーの開始処理
      return { ...state /* 更新後の状態 */ };

    case "PAUSE":
      // タイマーの一時停止処理
      return { ...state /* 更新後の状態 */ };

    // ... その他のアクションに対する処理 ...

    default:
      return state;
  }
};

export const PmdrProvider = ({ children }: { children: ReactNode }) => {
  const [pmdr, dispatch] = useReducer(timerReducer);
  return (
    <PmdrContext.Provider value={{ pmdr, dispatch }}>
      {children}
    </PmdrContext.Provider>
  );
};

export const usePmdrContext = () => useContext(PmdrContext);
