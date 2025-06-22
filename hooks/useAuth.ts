import { useEffect } from "react";
import { useFetchData } from "./useApi";
import { useAuthStore } from "@/store/useAuthStore";
import { FETCHUSER } from "@/config/user.endpoints";
import { UserBackendResponse } from "@/types/user.types";
import { useServerStatus } from "./useServerStatus";
import { getCookie } from "@/utils/helpers";

export const useAuth = () => {
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();
  const loggedInToken = getCookie("_xur_cr-host");

  const setUser = useAuthStore((state) => state.setUser);
  const setUserLoading = useAuthStore((state) => state.setUserLoading);

  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
  } = useFetchData<UserBackendResponse>({
    method: "GET",
    url: FETCHUSER,
    queryKey: ["user"],
    enabled: !serverStatusLoading && isOnline && !!loggedInToken,
  });

  useEffect(() => {
    setUserLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData.user);
    }
  }, [isSuccess, userData]);

  return { userData, error, userLoading: isLoading };
};
