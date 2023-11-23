import { ToastProps } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const isWebPushSupported = useCallback(
    (): boolean => "Notification" in window,
    []
  );

  const onNotifyInApp = useCallback(
    ({ title, body, variant }: NotificationContent & ToastProps) => {
      toast({ title, description: body, variant });
    },
    [toast]
  );

  const onNotifyViaWebPush = useCallback(
    (content: NotificationContent, options?: NotificationOptions) => {
      if (!isWebPushSupported() || Notification.permission !== "granted") {
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
    async (
      content: NotificationContent & ToastProps,
      options?: NotificationOptions
    ) => {
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
            onNotify({
              title: "Notification permission denied",
              body: "Please enable notification permission in your browser",
              variant: "destructive",
            });
            return false;
          case "default":
            return false;
        }
      } catch (error) {
        await onNotify({
          title: "Notification permission error",
          body: "It may be a browser that WebPush does not support.",
        });
        console.error(error);
        return false;
      }
    },
    [onNotify]
  );

  return {
    onWebPushPermission,
    onNotify,
    onNotifyViaWebPush,
    onNotifyInApp,
  };
};
