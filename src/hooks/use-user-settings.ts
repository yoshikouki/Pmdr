"use client";

import { UserSettingsContext } from "@/app/user-settings-provider";
import { useContext } from "react";

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);

  return {
    ...context,
  };
};
