"use client";

import { Moon, Smartphone, Sun } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
    >
      <ToggleGroupItem
        className={cn("h-12 w-12", theme === "light" && "text-primary")}
        value="light"
        aria-label="Change to light theme"
      >
        <Sun className={cn(theme === "light" && "text-primary fill-primary")} />
        <span className="sr-only">Change to light theme</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className={cn("h-12 w-12", theme === "dark" && "text-primary")}
        value="dark"
        aria-label="Change to dark theme"
      >
        <Moon className={cn(theme === "dark" && "text-primary fill-primary")} />
        <span className="sr-only">Change to dark theme</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className={cn("h-12 w-12", theme === "system" && "text-primary")}
        value="system"
        aria-label="Change to the theme in the device settings"
      >
        <Smartphone
          className={cn(theme === "system" && "text-primary fill-primary")}
        />
        <span className="sr-only">
          Change to the theme in the device settings
        </span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
