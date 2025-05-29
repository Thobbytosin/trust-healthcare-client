import { useEffect, useState } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { DOCTORSLANDINGPAGE } from "@/config/doctor.endpoints";
import { isServerOnline } from "@/utils/isServerOnline";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useFetchDoctorsFree = () => {
  const hasBeenAuthenticated =
    typeof document !== "undefined" &&
    document?.cookie.includes("cookie_consent");

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      if (hasBeenAuthenticated) {
        const online = await isServerOnline();
        setIsOnline(online);
      }
    };

    checkServer();
  }, [hasBeenAuthenticated]);

  const setDoctors = useDoctorsStore((state) => state.setDoctors);

  const { data, error, isLoading } = useFetchData<BackendSuccessResponse>({
    method: "GET",
    queryKey: ["getDoctors"],
    url: DOCTORSLANDINGPAGE,
    skipAuthRefresh: true, //token not needed
    enabled: hasBeenAuthenticated && isOnline,
  });

  useEffect(() => {
    if (data) {
      setDoctors(data.doctors); // refresh after success
    }
  }, [data]);

  return { error, loading: isLoading };
};
