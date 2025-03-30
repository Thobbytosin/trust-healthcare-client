/* eslint-disable react-hooks/exhaustive-deps */
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
interface BackendFailureResponse {
  success: boolean;
  message: string;
}

export const useFetchDoctors = () => {
  const setDoctors = useDoctorsStore((state) => state.setDoctors);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } =
    useFetchData<BackendSuccessResponse>({
      method: "GET",
      queryKey: ["getDoctors"],
      url: `/get-doctors`,
      enabled: false,
    });

  // useEffect(() => {
  //   refetch(); // Manually trigger fetching only on mount
  // }, []);

  useEffect(() => {
    // console.log("DATA CHANGED");
    if (data) {
      console.log("DATA REFETCHED");
      setDoctors(data.doctors);
      queryClient.invalidateQueries(); // refresh after success
    }
  }, [data]);

  useEffect(() => {
    // console.log("ERORR CHANGED");
    if (error) {
      toast.error("Something went wrong!", {
        description: error.message,
        duration: 4000,
      });
    }
  }, [error]);

  return { isLoading, refetch };
};
