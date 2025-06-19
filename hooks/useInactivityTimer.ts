import { useEffect, useRef } from "react";

type useInactivityTimerOptions = {
  timeout: number;
  onTimeout: () => void;
  enabled: boolean;
};
export const useInactivityTimer = ({
  onTimeout,
  timeout,
  enabled,
}: useInactivityTimerOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return; // do nothing

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onTimeout, timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];

    // resets and start the timer
    const handleActivity = () => {
      //   console.log("🖱️ User activity detected, resetting timer...");
      resetTimer();
    };

    // reset timer when user interacts
    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer(); // start timer

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, timeout, onTimeout]);
};
