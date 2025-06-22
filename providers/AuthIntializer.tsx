"use client";

import { useAuthValidate } from "@/hooks/useAuth";
// import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/user.types";
import { useEffect } from "react";

const AuthIntializer = ({ user }: { user: User | null }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setUserLoading = useAuthStore((state) => state.setUserLoading);

  useEffect(() => {
    setUserLoading(true);
    setUser(user ?? null);
    setUserLoading(false);
  }, [user]);

  const { error } = useAuthValidate();
  if (error) {
    console.log("Auth validation failed:", error);
  }

  return null;
};

export default AuthIntializer;
