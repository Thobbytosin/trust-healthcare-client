import { useFetchData } from "./useApi";
import { useServerStatus } from "./useServerStatus";
import { getCookie } from "@/utils/helpers";
import { VALIDATETOKEN } from "@/config/auth.endpoints";

export const useAuthValidate = () => {
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();
  const loggedInToken = getCookie("_XUR_CR_HOST");

  const { data, error } = useFetchData({
    method: "GET",
    url: VALIDATETOKEN,
    queryKey: ["validate-token"],
    enabled: !serverStatusLoading && isOnline && !!loggedInToken,
  });

  return { data, error };
};
