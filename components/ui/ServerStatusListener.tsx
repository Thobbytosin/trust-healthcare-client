"use client";

import { useEffect, useRef, useState } from "react";
import { isServerOnline } from "@/utils/isServerOnline";

const ServerStatusListener = ({
  RETRY_INTERVAL,
  attempts,
}: {
  RETRY_INTERVAL: number;
  attempts: number;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(RETRY_INTERVAL / 1000);
  const [doneRetrying, setDoneRetrying] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const displayAttempt = Math.max(1, attempts - 1);
  const maxAttempts = 5;

  useEffect(() => {
    if (attempts - 2 >= maxAttempts) {
      setDoneRetrying(true);
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }

    countdownRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return RETRY_INTERVAL / 1000;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [RETRY_INTERVAL, attempts]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="mt-4 text-center text-gray-600 text-sm">
          {doneRetrying ? (
            <>
              <span className="text-xl font-medium">
                Could not reconnect after {maxAttempts} attempts.
              </span>

              <button
                onClick={() => {
                  window.location.reload();
                }}
                className={`mt-6 md:mt-3 text-xs bg-primary text-white px-6 py-2 cursor-pointer flex justify-self-center`}
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-red-600">
                🚨 Server is currently down. Please try again later.
              </h1>
              Retrying in {secondsLeft}s...
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServerStatusListener;
