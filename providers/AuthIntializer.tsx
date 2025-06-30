"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { TUser } from "@/types/user.types";
import { useEffect } from "react";
import { toast } from "sonner";

const AuthIntializer = ({ user }: { user: TUser | null }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setUserLoading = useAuthStore((state) => state.setUserLoading);

  useEffect(() => {
    const message = localStorage.getItem("showLoginSuccessToast");
    if (message) {
      window.scrollTo(0, 0);

      setTimeout(() => {
        toast.success("Welcome to Trust HealthCare!", {
          description: message,
          duration: 4000,
        });
      }, 0);

      localStorage.removeItem("showLoginSuccessToast");
    }
  }, []);

  useEffect(() => {
    setUserLoading(true);
    setUser(user ?? null);
    setUserLoading(false);
  }, [user]);

  // call only if server can find user data
  const { error } = useAuth({ enabled: user === null });
  if (error) {
    console.log("Auth validation failed:", error);
  }

  return null;
};

export default AuthIntializer;
