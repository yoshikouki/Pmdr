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
      await updateSettings(newSettings);
      setSettings(newSettings);
      return newSettings;
    },
    [setSettings]
  );

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
