import { FeedbackSoundKeys } from "./feedback";
import { addData, getById, updateData } from "./indexed-db";

export type UserSettings = {
  id: string;
  // Notification
  isNotificationsEnabled: boolean;
  isWebPushEnabled: boolean;
  isInAppNotificationsEnabled: boolean;
  // Feedback
  isSoundEnabled: boolean;
  feedbackVolume: number;
  feedbackSound: FeedbackSoundKeys;
};

export const initialSettings: UserSettings = {
  id: "nonlogin",
  // Notification
  isNotificationsEnabled: true,
  isWebPushEnabled: false,
  isInAppNotificationsEnabled: true,
  // Feedback
  isSoundEnabled: true,
  feedbackVolume: 100,
  feedbackSound: "default",
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
