import { useEffect } from "react";
import { useDoctorsStore } from "../store/useDoctorsStore";
import { useFetchData } from "./useApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useFetchDoctors = () => {
  const setDoctors = useDoctorsStore((state) => state.setDoctorsFree);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } =
    useFetchData<BackendSuccessResponse>({
      method: "GET",
      queryKey: ["getDoctors"],
      url: `/doctor/get-some-doctors-free`,
      enabled: false,
      skipAuthRefresh: true,
    });

  useEffect(() => {
    if (data) {
      setDoctors(data.doctors);
      queryClient.invalidateQueries(); // refresh after success
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!", {
        description: error.message,
        duration: 4000,
      });
    }
  }, [error]);

  return { isLoading, refetch };
};
