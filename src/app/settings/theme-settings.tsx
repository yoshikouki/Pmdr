"use client";

import { Moon, Smartphone, Sun } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
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
          onValueChange={(value) => {
            if (value) setTheme(value);
          }}
        >
          <ToggleGroupItem
            value="light"
            className={cn("h-12 flex-grow")}
            aria-label="Change to light theme"
          >
            <Sun className="mr-2" />
            <span>Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="dark"
            className={cn("h-12 flex-grow")}
            aria-label="Change to dark theme"
          >
            <Moon className="mr-2" />
            <span>Dark</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="system"
            size="default"
            variant="default"
            className={cn("h-12 flex-grow")}
            aria-label="Change to the theme in the device settings"
          >
            <Smartphone className="mr-2" />
            <span>Device</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
