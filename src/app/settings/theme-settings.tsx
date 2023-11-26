"use client";

import { Moon, Smartphone, Sun } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFeedback } from "@/hooks/use-feedback";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { onFeedback } = useFeedback();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex">
        <ToggleGroup
          className="w-full justify-between"
          type="single"
          value={mounted ? theme : undefined}
          onValueChange={async (value) => {
            await onFeedback();
            if (value) setTheme(value);
          }}
        >
          <ToggleGroupItem
            value="light"
            className={cn("h-12 flex-grow")}
            aria-label="Change to light theme"
          >
            <Sun
              className={cn(
                "mr-2",
                theme === "light" && "text-primary fill-primary"
              )}
            />
            <span className={cn(theme === "light" && "font-extrabold")}>
              Light
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="dark"
            className={cn("h-12 flex-grow")}
            aria-label="Change to dark theme"
          >
            <Moon
              className={cn(
                "mr-2",
                theme === "dark" && "text-primary fill-primary"
              )}
            />
            <span className={cn(theme === "dark" && "font-extrabold")}>
              Dark
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="system"
            size="default"
            variant="default"
            className={cn("h-12 flex-grow")}
            aria-label="Change to the theme in the device settings"
          >
            <Smartphone
              className={cn(
                "mr-2",
                theme === "system" && "text-primary fill-primary"
              )}
            />
            <span className={cn(theme === "system" && "font-extrabold")}>
              Device
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
