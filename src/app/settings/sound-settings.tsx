"use client";

import { Check, Volume2 } from "lucide-react";

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
import { useFeedback } from "@/hooks/use-feedback";
import { useUserSettings } from "@/hooks/use-user-settings";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export const SoundSettings: React.FC = ({ className, ...props }: CardProps) => {
  const { settings, onSettingsUpdate } = useUserSettings();
  const { onFeedback } = useFeedback();

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Sound</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <Volume2
            className={cn(
              settings.isSoundEnabled
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            )}
          />
          <div className="flex-1 space-y-1">
            <Paragraph className="leading-none">All Sounds</Paragraph>
            <Paragraph variant="muted" size="sm">
              Turn on or off sounds for the entire app.
            </Paragraph>
          </div>
          <Switch
            checked={settings.isSoundEnabled}
            onCheckedChange={async (checked: boolean) => {
              await onSettingsUpdate({
                ...settings,
                isSoundEnabled: checked,
              });
              await onFeedback();
            }}
          />
        </div>
      </CardContent>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4"></div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            await onFeedback();
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
