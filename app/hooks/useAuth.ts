import { useEffect } from "react";
import { useFetchData } from "./useApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserStore } from "../store/useUserStore";

// user type
export type User = {
  name: string;
  email: string;
  verified: boolean;
  lastLogin: Date;
  lastPasswordReset: Date;
  role: [string];
};

// backend response type
interface BackendResponse {
  success: boolean;
  message: string;
  user: User;
}

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useFetchData<BackendResponse>({
    method: "GET",
    url: "/user/me",
    queryKey: ["user"],
    enabled: false, // avoid auto-fetching
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
      queryClient.invalidateQueries(); // refresh after success
    }
  }, [data]);

  useEffect(() => {
    // if (error) {
    //   toast.error("Something went wrong!", {
    //     description: error.message,
    //     duration: 4000,
    //   });
    // }
    console.log("USER ERROR:", error);
  }, [error]);

  return { isLoading, refetch };
};
