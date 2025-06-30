import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { SERVER_URI } from "@/config/api";
import { getCookie } from "@/utils/helpers";
import { ApiError, ApiSuccess } from "@/types/api.types";

const consent = getCookie("cookie_consent");

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
  return useQuery<ApiSuccess<T>, ApiError>({
    queryKey: [...queryKey],
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
            ...(headers || {}),
            "x-cookie-consent": consent,
          };
        }

        const response = await axiosInstance(config);

        // validate response structure
        if (!response.data || typeof response.data.success !== "boolean") {
          throw {
            success: false,
            message: "Invalid API response structure",
            statusCode: 500,
          } satisfies ApiError;
        }

        return response.data;
      } catch (error: any) {
        const fallbackError: ApiError = {
          success: false,
          message: "Unexpected error",
          statusCode: 500,
        };

        if (axios.isAxiosError(error) && error.response?.data) {
          const data = error.response.data;
          throw {
            success: false,
            message: data.message,
            statusCode: data.statusCode,
          } satisfies ApiError;
        } else {
          throw fallbackError satisfies ApiError;
        }
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled,
    retry: 1, // Retry once on failure
  });
}

// FOR POST, PUT, DELETE requests
interface MutationOptions<TResponse, TRequest = unknown> {
  mutationKey: (string | number)[];
  url: string;
  method: "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  skipAuthRefresh?: boolean;
  onSuccess: (data: ApiSuccess<TResponse>) => void;
  onError: (error: ApiError) => void;
}

export function useMutateData<TResponse, TRequest = unknown>({
  url,
  method,
  headers,
  mutationKey,
  skipAuthRefresh = true,
  onError,
  onSuccess,
}: MutationOptions<TResponse, TRequest>) {
  return useMutation<ApiSuccess<TResponse>, ApiError, TRequest>({
    mutationKey: mutationKey,
    mutationFn: async (data: TRequest) => {
      const config: any = {
        method,
        url: `${SERVER_URI}${url}`,
        data,
        withCredentials: true,
        headers: headers || {},
        skipAuthRefresh,
      };

      const response = await axiosInstance<ApiSuccess<TResponse>>(config);

      // check if response structure is correct
      if (!response.data || typeof response.data.success !== "boolean") {
        throw {
          success: false,
          message: "Invalid API response structure",
          statusCode: 500,
        } satisfies ApiError;
      }

      return response.data;
    },
    onSuccess: (data) => {
      if (!data.success) {
        onError(data as ApiError);
        return;
      }

      onSuccess(data);
    },
    onError: (error: AxiosError<ApiError> | ApiError) => {
      const apiError = axios.isAxiosError(error)
        ? error?.response?.data || {
            success: false,
            message: error.message,
            statusCode: error.response?.status || 500,
          }
        : error;

      onError(apiError);
    },
  });
}
