import { useMemo } from "react";
import { useFetchData } from "./useApi";
import { TDoctorsData } from "@/types/doctor.types";
import { GETALLDOCTORS } from "@/config/doctor.endpoints";
import { useServerStatus } from "./useServerStatus";

export const useFetchDoctors = (queryParams: URLSearchParams | null) => {
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();

  const queryString = useMemo(() => queryParams?.toString(), [queryParams]);

  const queryKey = useMemo(() => ["doctors", queryString], [queryString]);

  const { data, error, isLoading, isSuccess } = useFetchData<TDoctorsData>({
    method: "GET",
    url: `${GETALLDOCTORS}?${queryString}`,
    queryKey: [`doctors, ${queryKey}`],
    enabled: !serverStatusLoading && isOnline,
  });

  return { data: data?.data, error, isLoading, isSuccess };
};
