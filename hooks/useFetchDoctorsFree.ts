import { useEffect, useState } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DOCTORSLANDINGPAGE } from "@/config/doctor.endpoints";
import { isServerOnline } from "@/utils/isServerOnline";
import { useServerStatus } from "./useServerStatus";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useFetchDoctorsFree = () => {
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();

  const setDoctors = useDoctorsStore((state) => state.setDoctors);

  const { data, error, isLoading, isSuccess } =
    useFetchData<BackendSuccessResponse>({
      method: "GET",
      queryKey: ["getDoctors"],
      url: DOCTORSLANDINGPAGE,
      skipAuthRefresh: true, //token not needed
      enabled: !serverStatusLoading && isOnline,
    });

  useEffect(() => {
    if (data && isSuccess) {
      setDoctors(data.doctors); // refresh after success
    }
  }, [data, isSuccess]);

  return { error, loading: isLoading };
};
