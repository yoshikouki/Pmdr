"use client";

import {
  UserSettings,
  initSettings,
  initialSettings,
  updateSettings,
} from "@pmdr/core/src/setting";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface UserSettingsContextType {
  settings: UserSettings;
  onSettingsUpdate: (newSettings: UserSettings) => Promise<UserSettings>;
}

export const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: initialSettings,
  onSettingsUpdate: updateSettings,
});

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);

  const onSettingsUpdate = useCallback(
    async (newSettings: UserSettings) => {
      const settings = await updateSettings(newSettings);
      setSettings(settings);
      return settings;
    },
    [setSettings]
  );

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        const initializedSettings = await initSettings();
        setSettings(initializedSettings);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    initializeSettings();
  }, []);

  return (
    <UserSettingsContext.Provider
      value={{
        settings,
        onSettingsUpdate,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
