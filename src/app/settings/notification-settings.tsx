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
import { useUserSettings } from "@/hooks/use-user-settings";
import { cn } from "@/lib/utils";
import { UserSettings } from "@pmdr/core/src/setting";

type CardProps = React.ComponentProps<typeof Card>;

export const NotificationSettings: React.FC = ({
  className,
  ...props
}: CardProps) => {
  const { settings, updateSettings } = useUserSettings();
  const generateOnUpdate =
    (key: keyof UserSettings) => async (checked: boolean) => {
      await updateSettings({
        ...settings,
        [key]: checked,
      });
    };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">All Notifications</Paragraph>
            <Paragraph variant="muted" size="sm">
              Turn on or off notifications for the entire app.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isNotificationsEnabled}
            onCheckedChange={generateOnUpdate("isNotificationsEnabled")}
          />
        </div>
      </CardContent>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <Vibrate />
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
            onCheckedChange={generateOnUpdate("isWebPushEnabled")}
          />
        </div>
      </CardContent>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <GalleryVerticalEnd />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">In-App Notifications</Paragraph>
            <Paragraph variant="muted" size="sm">
              Receive notifications while using the app.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isInAppNotificationsEnabled}
            onCheckedChange={generateOnUpdate("isInAppNotificationsEnabled")}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full">
          <Check className="mr-2 h-4 w-4" /> Test
        </Button>
      </CardFooter>
    </Card>
  );
};
