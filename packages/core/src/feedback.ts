import { initSettings } from "./setting";

type Feedbacks = {
  volume: number;
  sound: {
    default: FeedbackSound;
  };
};

type FeedbackSound = {
  id: FeedbackSoundKeys;
  path: string;
};

export type FeedbackSoundKeys = keyof typeof feedbacks.sound;

export const feedbackSoundVolumeMax = 100;
export const feedbackSoundVolumeMin = 0;

export const feedbacks: Feedbacks = {
  volume: 100,
  sound: {
    default: {
      id: "default",
      path: "/se/mechanical-switch.wav",
    },
  },
};

export const playFeedbackSound = async () => {
  const { isSoundEnabled, feedbackVolume, feedbackSoundPath } =
    await getFeedbackSoundSettings();
  if (!isSoundEnabled) return;
  const audio = new Audio(feedbackSoundPath);
  audio.volume = feedbackVolume / feedbackSoundVolumeMax;
  await audio.play();
};

const getFeedbackSoundSettings = async () => {
  const { isSoundEnabled, feedbackVolume, feedbackSound } =
    await initSettings();
  const feedbackSoundId = feedbackSound ?? "default";
  return {
    isSoundEnabled: isSoundEnabled ?? true,
    feedbackVolume: feedbackVolume ?? 100,
    feedbackSound: feedbackSoundId,
    feedbackSoundPath: getFeedbackSoundPath(feedbackSoundId),
  };
};

const getFeedbackSoundPath = (soundId: FeedbackSoundKeys) => {
  const sound = feedbacks.sound[soundId];
  if (!sound) return feedbacks.sound.default.path;
  return sound.path;
};
