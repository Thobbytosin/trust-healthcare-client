import { useEffect } from "react";
import { useFetchData } from "./useApi";
import { useAuthStore } from "@/store/useAuthStore";
import { FETCHUSER } from "@/config/user.endpoints";
import { useServerStatus } from "./useServerStatus";
import { getCookie } from "@/utils/helpers";
import { TUser } from "@/types/user.types";

export const useAuth = ({ enabled }: { enabled: boolean }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setUserLoading = useAuthStore((state) => state.setUserLoading);
  const consent = getCookie("cookie_consent");
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();
  const loggedInToken = getCookie("_XUR_CR_HOST");

  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
  } = useFetchData<TUser>({
    method: "GET",
    url: FETCHUSER,
    queryKey: ["user"],
    enabled:
      enabled &&
      !!consent &&
      !serverStatusLoading &&
      isOnline &&
      !!loggedInToken,
  });

  useEffect(() => {
    if (!enabled) return;
    setUserLoading(isLoading);
  }, [enabled, isLoading]);

  useEffect(() => {
    if (!enabled) return;
    if (isSuccess && userData) {
      setUser(userData.data);
    }
  }, [enabled, isSuccess, userData]);

  return {
    userData: enabled ? userData : null,
    error: enabled ? error : null,
    userLoading: enabled ? isLoading : false,
  };
};
