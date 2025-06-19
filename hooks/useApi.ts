import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { SERVER_URI } from "@/config/api";

interface FetchOptions {
  url: string;
  method: "GET";
  queryKey: (string | number)[];
  headers?: Record<string, string>;
  enabled?: boolean;
  staleTime?: number;
  skipAuthRefresh?: boolean;
}

// for GET requests
export function useFetchData<T>({
  url,
  queryKey,
  method,
  headers,
  enabled = false,
  skipAuthRefresh = false,
}: FetchOptions) {
  return useQuery<T, any>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const config: any = {
          method,
          url: `${SERVER_URI}${url}`,
          withCredentials: true,
          skipAuthRefresh,
        };

        // set headers
        if (headers) {
          config.headers = {
            ...headers,
          };
        }

        const response = await axiosInstance(config);
        if (response) {
          return response.data;
        }
      } catch (error: any) {
        // if (axios?.isAxiosError(error) && error.response) {
        //   console.error(error.response.data?.message || "API request failed");
        // }
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled,
    retry: 1, // Retry once on failure
  });
}

// FOR POST, PUT, DELETE requests
interface MutationOptions {
  mutationKey: (string | number)[];
  url: string;
  method: "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  skipAuthRefresh?: boolean;
}

export function useMutateData<T>({
  url,
  method,
  headers,
  mutationKey,
  skipAuthRefresh = true,
}: MutationOptions) {
  return useMutation<T, any, any>({
    mutationKey: [mutationKey],
    mutationFn: async (data: any) => {
      const config: any = {
        method,
        url: `${SERVER_URI}${url}`,
        data,
        withCredentials: true,
        skipAuthRefresh,
      };

      // Optionally add custom headers if needed
      if (headers) {
        config.headers = {
          ...headers,
        };
      }

      const response = await axiosInstance(config);

      return response.data;
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        // console.error(
        //   "Backend Error Details:",
        //   error.response.data || "No error message from server"
        // );
      }
    },
  });
}
