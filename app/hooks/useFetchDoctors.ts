import { useMemo } from "react";
import { useFetchData } from "./useApi";
import { DoctorsBackendResponse } from "@/types/doctor.types";
import { GETALLDOCTORS } from "@/config/doctor.endpoints";
import { useServerStatus } from "./useServerStatus";

export const useFetchDoctors = (queryParams: URLSearchParams | null) => {
  const canFetchUser: boolean = useServerStatus();

  const queryString = useMemo(() => queryParams?.toString(), [queryParams]);

  const queryKey = useMemo(() => ["doctors", queryString], [queryString]);

  const { data, error, isLoading, isSuccess } =
    useFetchData<DoctorsBackendResponse>({
      method: "GET",
      url: `${GETALLDOCTORS}?${queryString}`,
      queryKey: [`${queryKey || "doctors"}`],
      enabled: canFetchUser,
    });

  return { data, error, isLoading, isSuccess };
};
