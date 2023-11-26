type Feedbacks = {
  volume: number;
  sound: {
    default: FeedbackSoundOption;
  };
};

type FeedbackSoundOption = {
  id: FeedbackSoundKeys;
  path: string;
};

type FeedbackSound = {
  play: () => Promise<void>;
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

export const initFeedbackSound = ({
  isSoundEnabled,
  feedbackVolume,
  feedbackSound,
}: {
  isSoundEnabled: boolean;
  feedbackVolume: number;
  feedbackSound: FeedbackSoundKeys;
}): FeedbackSound => {
  if (!isSoundEnabled) {
    return { play: async () => {} };
  }
  const feedbackSoundPath = getFeedbackSoundPath(feedbackSound);
  const sound = new Audio(feedbackSoundPath);
  sound.volume = isNaN(feedbackVolume / feedbackSoundVolumeMax)
    ? 1
    : feedbackVolume / feedbackSoundVolumeMax;
  return sound;
};

export const getFeedbackSoundPath = (soundId: FeedbackSoundKeys) => {
  const sound = feedbacks.sound[soundId];
  if (!sound) return feedbacks.sound.default.path;
  return sound.path;
};
