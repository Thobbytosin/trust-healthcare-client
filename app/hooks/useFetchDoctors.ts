import { useMemo } from "react";
import { useFetchData } from "./useApi";
import { DoctorsBackendResponse } from "@/types/doctor.types";
import { GETALLDOCTORS } from "@/config/doctor.endpoints";

export const useFetchDoctors = (queryParams: URLSearchParams | null) => {
  const hasBeenAuthenticated =
    typeof window !== undefined &&
    typeof document !== undefined &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");

  const queryString = useMemo(() => queryParams?.toString(), [queryParams]);

  const queryKey = useMemo(() => ["doctors", queryString], [queryString]);

  const { data, error, isLoading, isSuccess } =
    useFetchData<DoctorsBackendResponse>({
      method: "GET",
      url: `${GETALLDOCTORS}?${queryString}`,
      queryKey: [`${queryKey || "doctors"}`],
      enabled: hasBeenAuthenticated,
    });

  return { data, error, isLoading, isSuccess };
};
