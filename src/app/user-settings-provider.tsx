"use client";

import {
  UserSettings,
  initSettings,
  initialSettings,
  updateSettings,
} from "@pmdr/core/src/setting";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserSettingsContextType {
  settings: UserSettings | null;
  updateSettings: (newSettings: UserSettings) => Promise<UserSettings>;
}

export const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: initialSettings,
  updateSettings,
});

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const value = {
    settings,
    updateSettings: async (newSettings: UserSettings) => {
      await updateSettings(newSettings);
      setSettings(newSettings);
      return newSettings;
    },
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const fetchedSettings = await initSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
};
