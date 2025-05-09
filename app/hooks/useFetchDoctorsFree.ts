import { useEffect } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DOCTORSLANDINGPAGE } from "@/config/doctor.endpoints";
import { useServerStatus } from "./useServerStatus";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useFetchDoctorsFree = () => {
  const canFetchUser: boolean = useServerStatus();
  const setDoctors = useDoctorsStore((state) => state.setDoctors);

  const { data, error, isLoading } = useFetchData<BackendSuccessResponse>({
    method: "GET",
    queryKey: ["getDoctors"],
    url: DOCTORSLANDINGPAGE,
    skipAuthRefresh: true, //token not needed
    enabled: canFetchUser,
  });

  useEffect(() => {
    if (data) {
      setDoctors(data.doctors); // refresh after success
    }
  }, [data]);

  return { error, loading: isLoading };
};
