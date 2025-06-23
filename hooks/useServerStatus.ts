/* eslint-disable react-hooks/exhaustive-deps */
import { isServerOnline } from "@/utils/isServerOnline";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export const useServerStatus = (options?: { checkInterval?: number }) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const wasOfflineRef = useRef(false);
  const consecutiveChecksRef = useRef(0);

  const checkStatus = async () => {
    setIsLoading(true);
    setError(null);

    const online = await isServerOnline();

    if (!online) {
      wasOfflineRef.current = true; // track offline
      setIsOnline(false);
      setError("Please check your network");
      // consecutiveChecksRef.current = 0; // set to 0 when server is down
      consecutiveChecksRef.current++;
    } else {
      // show toast only if server is coming from being down
      if (wasOfflineRef.current) {
        toast.success("Welcome Back!", {
          description: "Connection has been restored.",
          duration: 4000,
        });

        wasOfflineRef.current = false;
        consecutiveChecksRef.current = 0;

        intervalRef.current && clearInterval(intervalRef.current);
        intervalRef.current = null;

        window.location.reload();
      }
      // consecutiveChecksRef.current++; // increase consecutive success check by 1
      setError(null);
      setIsOnline(true);
    }

    // console.log("COUNTS", consecutiveChecksRef.current);

    // Stop checking after 5 consecutive successes (5 because of the immediate check and first interval)
    if (consecutiveChecksRef.current >= 7 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // setIsOnline(online);
    return setIsLoading(false);
  };

  useEffect(() => {
    checkStatus();

    const interval = options?.checkInterval;

    if (interval && interval > 0) {
      checkStatus(); // Immediate check
      intervalRef.current = setInterval(checkStatus, interval);
    }

    // cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [options?.checkInterval]);

  return {
    isOnline,
    isLoading,
    error,
    checkStatus,
    attempts: consecutiveChecksRef.current,
  };
};
