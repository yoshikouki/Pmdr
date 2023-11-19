import { getById, updateData } from "./indexed-db";

export type UserSettings = {
  id: string;
  isNotificationsEnabled: boolean;
  isWebPushEnabled: boolean;
  isInAppNotificationsEnabled: boolean;
};
};

export const getSettings = async (): Promise<UserSettings> => {
  return await getById("settings", "nonlogin");
};

export const updateSettings = async (
  newSettings: UserSettings
): Promise<UserSettings> => {
  return await updateData("settings", newSettings);
};
};
