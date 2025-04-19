import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URI } from "../utils/uri";
import axiosInstance from "../utils/axiosInstance";

interface FetchOptions {
  url: string;
  method: "GET";
  queryKey: (string | number)[];
  enabled?: boolean;
  staleTime?: number;
  skipAuthRefresh?: boolean;
}

// for GET requests
export function useFetchData<T>({
  url,
  queryKey,
  method,
  enabled = false,
  staleTime = 1000 * 60 * 5, // Default: 5 minutes
  skipAuthRefresh,
}: FetchOptions) {
  return useQuery<T, any>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const config: any = {
          method,
          url: `${SERVER_URI}${url}`,
          withCredentials: true,
        };

        const response = await axiosInstance(config);
        if (response) {
          return response.data;
        }
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          // console.log(
          //   "Backend Error Message:",
          //   error.response.data?.message || "No error message from server"
          // );
          throw new Error(error.response.data?.message || "API request failed");
        }
        throw new Error("Something went wrong"); // generic error message
      }
    },
    staleTime,
    enabled,
    retry: 1, // Retry once on failure
  });
}

// FOR POST, PUT, DELETE requests
interface MutationOptions {
  mutationKey: (string | number)[];
  url: string;
  method: "POST" | "PUT" | "DELETE";
  headers?: boolean;
  skipAuthRefresh?: boolean;
}

export function useMutateData<T>({
  url,
  method,
  headers = false,
  mutationKey,
  skipAuthRefresh,
}: MutationOptions) {
  const queryClient = useQueryClient();

  return useMutation<T, any, any>({
    mutationKey: [mutationKey],
    mutationFn: async (data: any) => {
      const config: any = {
        method,
        url: `${SERVER_URI}${url}`,
        data,
        withCredentials: true,
      };

      const response = await axiosInstance(config);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); // refresh after success
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log(
          "Backend Error Message:",
          error.response.data?.message || "No error message from server"
        );
        console.log(
          "Backend Error Details:",
          error.response.data || "No error message from server"
        );
        throw new Error(error.response.data?.message || "API request failed");
      }
      throw new Error("Something went wrong");
    },
  });
}
