import { useEffect } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DoctorBackendSuccessResponse } from "@/types/doctor.types";
import { GETDOCTOR } from "@/config/doctor.endpoints";

export const useFetchDoctor = (doctorId: string) => {
  const hasBeenAuthenticated =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");

  const setDoctor = useDoctorsStore((state) => state.setDoctor);

  const { data, error } = useFetchData<DoctorBackendSuccessResponse>({
    method: "GET",
    url: `${GETDOCTOR}/${doctorId}`,
    queryKey: [`${doctorId}`],
    enabled: hasBeenAuthenticated,
  });

  useEffect(() => {
    if (data) {
      setDoctor(data.doctor);
    }
  }, [data]);

  return { error };
};
