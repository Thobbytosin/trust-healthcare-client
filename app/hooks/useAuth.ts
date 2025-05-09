import { useEffect } from "react";
import { useFetchData } from "./useApi";
import { useAuthStore } from "@/store/useAuthStore";
import { FETCHUSER } from "@/config/user.endpoints";
import { UserBackendResponse } from "@/types/user.types";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const hasBeenAuthenticated =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");

  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
  } = useFetchData<UserBackendResponse>({
    method: "GET",
    url: FETCHUSER,
    queryKey: ["user"],
    enabled: hasBeenAuthenticated, // auto-fetch only if there is hasLoggedIN token when app loads
  });

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData.user);
    }
  }, [isSuccess, userData]);

  return { userData, error, userLoading: isLoading };
};
