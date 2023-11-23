"use client";

import { BellRing, Check, GalleryVerticalEnd, Vibrate } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Paragraph } from "@/components/ui/typography";
import { useNotification } from "@/hooks/use-notification";
import { useUserSettings } from "@/hooks/use-user-settings";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export const NotificationSettings: React.FC = ({
  className,
  ...props
}: CardProps) => {
  const { settings, onSettingsUpdate } = useUserSettings();
  const { onWebPushPermission, onNotify, onNotifyViaWebPush, onNotifyInApp } =
    useNotification();

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <BellRing
            className={cn(
              settings.isNotificationsEnabled
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            )}
          />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">All Notifications</Paragraph>
            <Paragraph variant="muted" size="sm">
              Turn on or off notifications for the entire app.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isNotificationsEnabled}
            onCheckedChange={async (checked: boolean) => {
              await onSettingsUpdate({
                ...settings,
                isNotificationsEnabled: checked,
              });
            }}
          />
        </div>
      </CardContent>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <Vibrate
            className={cn(
              settings.isNotificationsEnabled && settings.isWebPushEnabled
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            )}
          />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">
              Web Push Notifications
            </Paragraph>
            <Paragraph variant="muted" size="sm">
              Get notifications through your web browser.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isWebPushEnabled}
            disabled={!settings.isNotificationsEnabled}
            onCheckedChange={async (checked: boolean) => {
              if (checked) {
                const isWebPushEnabled = await onWebPushPermission({
                  isWebPushEnabled: checked,
                });
                if (!isWebPushEnabled) return;
                await onSettingsUpdate({
                  ...settings,
                  isWebPushEnabled,
                });
                onNotifyViaWebPush({
                  title: "Web Push Notifications Enabled",
                  body: "You will now receive notifications through your web browser.",
                });
              } else {
                await onSettingsUpdate({
                  ...settings,
                  isWebPushEnabled: checked,
                });
              }
            }}
          />
        </div>
      </CardContent>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <GalleryVerticalEnd
            className={cn(
              settings.isNotificationsEnabled &&
                settings.isInAppNotificationsEnabled
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            )}
          />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">In-App Notifications</Paragraph>
            <Paragraph variant="muted" size="sm">
              Receive notifications while using the app.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isInAppNotificationsEnabled}
            disabled={!settings.isNotificationsEnabled}
            onCheckedChange={async (checked: boolean) => {
              await onSettingsUpdate({
                ...settings,
                isInAppNotificationsEnabled: checked,
              });
              if (checked) {
                onNotifyInApp({
                  title: "In-App Notifications Enabled",
                  body: "You will now receive notifications while using the app.",
                });
              }
            }}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={async () => {
            await onNotify({
              title: "Test Notification",
              body: "This is a test notification.",
            });
          }}
          variant="outline"
          className="w-full"
        >
          <Check className="mr-2 h-4 w-4" /> Test
        </Button>
      </CardFooter>
    </Card>
  );
};
