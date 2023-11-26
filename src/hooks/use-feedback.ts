import { useCallback, useMemo } from "react";

import { initFeedbackSound } from "@pmdr/core/src/feedback";
import { useUserSettings } from "./use-user-settings";

export const useFeedback = () => {
  const { settings } = useUserSettings();

  const feedbackAudio = useMemo(() => {
    return initFeedbackSound({
      isSoundEnabled: settings.isSoundEnabled,
      feedbackVolume: settings.feedbackVolume,
      feedbackSound: settings.feedbackSound,
    });
  }, [
    settings.isSoundEnabled,
    settings.feedbackVolume,
    settings.feedbackSound,
  ]);

  const onFeedback = useCallback(async () => {
    await feedbackAudio.play();
  }, [feedbackAudio]);

  return {
    onFeedback,
  };
};
