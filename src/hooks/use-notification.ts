import { UserSettings, initSettings } from "@pmdr/core/src/setting";
import { useCallback } from "react";

type NotificationContent = {
  title: string;
  body?: string;
};

const defaultNotificationOptions: NotificationOptions = {
  icon: "/icons/dark.svg",
  image: "/icons/dark.svg",
  vibrate: [200],
};

export const useNotification = () => {
  const isWebPushSupported = "Notification" in window;

  const onNotifyInApp = useCallback(({ title, body }: NotificationContent) => {
    alert(`${title}\n${body}`);
  }, []);

  const onNotifyViaWebPush = useCallback(
    (content: NotificationContent, options?: NotificationOptions) => {
      if (!isWebPushSupported || Notification.permission !== "granted") {
        console.error("This browser does not support desktop notification");
        return;
      }
      new Notification(content.title, {
        ...defaultNotificationOptions,
        ...options,
        body: content.body,
      });
    },
    [isWebPushSupported]
  );

  const onNotify = useCallback(
    async (content: NotificationContent, options?: NotificationOptions) => {
      const settings = await initSettings();
      if (!settings.isNotificationsEnabled) return;

      if (settings.isInAppNotificationsEnabled) {
        onNotifyInApp(content);
      }
      if (settings.isWebPushEnabled) {
        onNotifyViaWebPush(content, options);
      }
    },
    [onNotifyInApp, onNotifyViaWebPush]
  );

  const onWebPushPermission = useCallback(
    async (settings?: Partial<UserSettings>): Promise<boolean> => {
      const initialSettings = await initSettings();
      const isNotificationsEnabled =
        settings?.isNotificationsEnabled ??
        initialSettings.isNotificationsEnabled;
      const isWebPushEnabled =
        settings?.isWebPushEnabled ?? initialSettings.isWebPushEnabled;
      if (!isNotificationsEnabled || !isWebPushEnabled) return false;
      try {
        const permission = await Notification.requestPermission();
        switch (permission) {
          case "granted":
            return true;
          case "denied":
            await onNotifyInApp({
              title: "Notification permission denied",
              body: "Please enable notification permission in your browser",
            });
            return false;
          case "default":
            return false;
        }
      } catch (error) {
        onNotify({
          title: "Notification permission error",
          body: "It may be a browser that WebPush does not support.",
        });
        console.error(error);
        return false;
      }
    },
    [onNotify, onNotifyInApp]
  );

  return {
    onWebPushPermission,
    onNotify,
    onNotifyViaWebPush,
    onNotifyInApp,
  };
};
