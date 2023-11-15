import { getById, updateData } from "./indexed-db";

export type UserSettings = {
  isEnableNotification: boolean;
};

export const getSettings = async (): Promise<UserSettings> => {
  return await getById("settings", "nonlogin");
};

export const updateSettings = async (
  newSettings: UserSettings
): Promise<UserSettings> => {
  return await updateData("settings", "nonlogin", newSettings);
};
