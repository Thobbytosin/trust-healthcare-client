import { useEffect } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DOCTORSLANDINGPAGE } from "@/config/doctor.endpoints";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useFetchDoctorsFree = () => {
  const setDoctors = useDoctorsStore((state) => state.setDoctors);
  const hasBeenAuthenticated =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");

  const { data, error, isLoading } = useFetchData<BackendSuccessResponse>({
    method: "GET",
    queryKey: ["getDoctors"],
    url: DOCTORSLANDINGPAGE,
    skipAuthRefresh: true, //token not needed
    enabled: hasBeenAuthenticated,
  });

  useEffect(() => {
    if (data) {
      setDoctors(data.doctors); // refresh after success
    }
  }, [data]);

  return { error, loading: isLoading };
};
