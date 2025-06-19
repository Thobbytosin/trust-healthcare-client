import { isServerOnline } from "@/utils/isServerOnline";
import { useEffect, useState } from "react";

export const useServerStatus = () => {
  const hasBeenAuthenticated =
    typeof document !== "undefined" && document.cookie.includes("_xur_cr-host");

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
