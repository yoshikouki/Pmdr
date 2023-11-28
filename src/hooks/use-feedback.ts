import { useCallback } from "react";

import { initFeedbackSound } from "@pmdr/core/src/feedback";
import { useUserSettings } from "./use-user-settings";

export const useFeedback = () => {
  const { settings } = useUserSettings();

  const onFeedback = useCallback(async () => {
    const feedbackAudio = initFeedbackSound({
      isSoundEnabled: settings.isSoundEnabled,
      feedbackVolume: settings.feedbackVolume,
      feedbackSound: settings.feedbackSound,
    });
    await feedbackAudio.play();
  }, [
    settings.feedbackSound,
    settings.feedbackVolume,
    settings.isSoundEnabled,
  ]);

  return {
    onFeedback,
  };
};
