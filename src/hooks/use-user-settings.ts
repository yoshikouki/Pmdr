import { UserSettingsContext } from "@/app/user-settings-provider";
import { useContext } from "react";

export const useUserSettings = () => useContext(UserSettingsContext);
