"use client";

import { useAuth } from "@/hooks/useAuth";

const AuthIntializer = () => {
  const { error } = useAuth();

  if (error) {
    console.error("Auth initialization failed:", error);
  }
  
  return null;
};

export default AuthIntializer;
