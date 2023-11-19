import { addData, getById, updateData } from "./indexed-db";

export type UserSettings = {
  id: string;
  isNotificationsEnabled: boolean;
  isWebPushEnabled: boolean;
  isInAppNotificationsEnabled: boolean;
};

export const initialSettings: UserSettings = {
  id: "nonlogin",
  isNotificationsEnabled: true,
  isWebPushEnabled: false,
  isInAppNotificationsEnabled: true,
};

export const getSettings = async (): Promise<UserSettings> => {
  return await getById("settings", "nonlogin");
};

export const addSettings = async (
  newSettings: UserSettings
): Promise<UserSettings> => {
  return await addData("settings", newSettings);
};

export const updateSettings = async (
  newSettings: UserSettings
): Promise<UserSettings> => {
  return await updateData("settings", newSettings);
};

export const initSettings = async (): Promise<UserSettings> => {
  const settings = await getSettings();
  return settings || (await addSettings(initialSettings));
};
