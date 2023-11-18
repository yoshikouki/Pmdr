"use client";

import {
  UserSettings,
  getSettings,
  updateSettings,
} from "@pmdr/core/src/setting";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserSettingsContextType {
  settings: UserSettings | null;
  updateSettings: (newSettings: UserSettings) => Promise<void>;
}

export const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: {
    isEnableNotification: false,
  },
  updateSettings: async () => {},
});

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const value = {
    settings,
    updateSettings: async (newSettings: UserSettings) => {
      await updateSettings(newSettings);
      setSettings(newSettings);
    },
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const fetchedSettings = await getSettings();
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
