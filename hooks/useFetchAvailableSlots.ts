import { useFetchData } from "./useApi";
import { AvailableSlotsSuccessResponse } from "@/types/doctor.types";
import { GETDOCTORAVAILABLEDAYSLOTS } from "@/config/doctor.endpoints";
import { useServerStatus } from "./useServerStatus";

export const useFetchAvailableDaySlots = (doctorId: string, date: string) => {
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();

  const { data, isLoading } = useFetchData<AvailableSlotsSuccessResponse>({
    method: "GET",
    url: `${GETDOCTORAVAILABLEDAYSLOTS}/${doctorId}?date=${date}`,
    queryKey: ["available-day-slots", doctorId, date],
    enabled: !serverStatusLoading && isOnline,
  });

  return { loading: isLoading, data };
};
