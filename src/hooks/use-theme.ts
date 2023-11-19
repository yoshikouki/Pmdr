"use client";

import { useTheme as useNextTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";

export const useTheme = (): UseThemeProps => {
  const nextTheme = useNextTheme();
  const setTheme = (newTheme: string) => {
    nextTheme.setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/`;
  };

  return {
    ...nextTheme,
    setTheme,
  };
};
