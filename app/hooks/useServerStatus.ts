import { isServerOnline } from "@/utils/isServerOnline";
import { useEffect, useState } from "react";

export const useServerStatus = () => {
  const hasBeenAuthenticated =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");

  const [canFetchUser, setCanFetchUser] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      if (hasBeenAuthenticated) {
        const online = await isServerOnline();
        setCanFetchUser(online);
      }
    };

    checkServer();
  }, [hasBeenAuthenticated]);

  return canFetchUser;
};
