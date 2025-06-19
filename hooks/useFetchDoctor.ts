import { useEffect } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DoctorBackendSuccessResponse } from "@/types/doctor.types";
import { GETDOCTOR } from "@/config/doctor.endpoints";
import { useServerStatus } from "./useServerStatus";

export const useFetchDoctor = (doctorId: string) => {
  const canFetchUser: boolean = useServerStatus();
  const setDoctor = useDoctorsStore((state) => state.setDoctor);

  const { data, isLoading } = useFetchData<DoctorBackendSuccessResponse>({
    method: "GET",
    url: `${GETDOCTOR}/${doctorId}`,
    queryKey: [`doctor, ${doctorId}`],
    enabled: canFetchUser,
  });

  useEffect(() => {
    if (data) {
      setDoctor(data.doctor);
    }
  }, [data]);

  return { loading: isLoading };
};
