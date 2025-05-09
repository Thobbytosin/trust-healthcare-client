import { useEffect } from "react";
import { useFetchData } from "./useApi";
import { useAuthStore } from "@/store/useAuthStore";
import { FETCHUSER } from "@/config/user.endpoints";
import { UserBackendResponse } from "@/types/user.types";
import { useServerStatus } from "./useServerStatus";

export const useAuth = () => {
  const canFetchUser: boolean = useServerStatus();

  const setUser = useAuthStore((state) => state.setUser);

  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
  } = useFetchData<UserBackendResponse>({
    method: "GET",
    url: FETCHUSER,
    queryKey: ["user"],
    enabled: canFetchUser, // auto-fetch only if server is online and user is online
  });

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData.user);
    }
  }, [isSuccess, userData]);

  return { userData, error, userLoading: isLoading };
};
