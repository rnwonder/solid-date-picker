import { createEffect } from "solid-js";
import { setShowAnimation, showAnimation } from "../components/Button";

export const createButtonAnimation = (noButtonAnimation?: boolean) => {
  createEffect(() => {
    if (noButtonAnimation && showAnimation()) {
      setShowAnimation(false);
    }

    if (!noButtonAnimation && !showAnimation()) {
      setShowAnimation(true);
    }
  });
};
