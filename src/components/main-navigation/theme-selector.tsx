"use client";

import { Moon, Smartphone, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

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
        className="h-12 w-12"
        value="light"
        aria-label="Change to light theme"
      >
        <Sun />
        <span className="sr-only">Change to light theme</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-12 w-12"
        value="dark"
        aria-label="Change to dark theme"
      >
        <Moon />
        <span className="sr-only">Change to dark theme</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-12 w-12"
        value="system"
        aria-label="Change to the theme in the device settings"
      >
        <Smartphone />
        <span className="sr-only">
          Change to the theme in the device settings
        </span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
