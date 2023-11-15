import { UserSettingsContext } from "@/components/user-settings";
import { useContext } from "react";

export const useUserSettings = () => useContext(UserSettingsContext);
