"use client";

import { Moon, Smartphone, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const ThemeSettings: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex">
          <ToggleGroup
            className="w-full justify-between"
            type="single"
            value={theme}
            onValueChange={(value) => {
              if (value) setTheme(value);
            }}
          >
            <ToggleGroupItem
              className={cn(
                "h-12 flex-grow",
                theme === "light" && "text-primary"
              )}
              value="light"
              aria-label="Change to light theme"
            >
              <Sun className="mr-2" />
              <span>Light</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              className={cn(
                "h-12 flex-grow",
                theme === "dark" && "text-primary"
              )}
              value="dark"
              aria-label="Change to dark theme"
            >
              <Moon className="mr-2" />
              <span>Dark</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              className={cn(
                "h-12 flex-grow",
                theme === "system" && "text-primary"
              )}
              value="system"
              aria-label="Change to the theme in the device settings"
            >
              <Smartphone className="mr-2" />
              <span>Device</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};
