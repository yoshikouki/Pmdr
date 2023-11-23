import { useCallback } from "react";

import { playFeedbackSound } from "@pmdr/core/src/feedback";

export const useFeedback = () => {
  const onFeedback = useCallback(async () => {
    await playFeedbackSound();
  }, []);

  return {
    onFeedback,
  };
};
