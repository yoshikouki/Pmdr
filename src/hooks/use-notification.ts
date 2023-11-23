import { UserSettings, initSettings } from "@pmdr/core/src/setting";
import { useCallback } from "react";

export const useNotification = () => {
  const onWebPushPermission = useCallback(
    async (settings?: Partial<UserSettings>): Promise<boolean> => {
      const initialSettings = await initSettings();
      const isNotificationsEnabled =
        settings?.isNotificationsEnabled ??
        initialSettings.isNotificationsEnabled;
      const isWebPushEnabled =
        settings?.isWebPushEnabled ?? initialSettings.isWebPushEnabled;
      if (!isNotificationsEnabled || !isWebPushEnabled) return false;
      const permission = await Notification.requestPermission();
      switch (permission) {
        case "granted":
          return true;
        case "denied":
          alert(
            "Notifications have been blocked. Please enable them in your browser settings."
          );
          return false;
        case "default":
          return false;
      }
    },
    []
  );

  return {
    onWebPushPermission,
  };
};
