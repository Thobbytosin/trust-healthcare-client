"use client";
import { useFetchData } from "@/hooks/useApi";
import React, { createContext, useContext } from "react";

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
  user?: User;
}

// user context type
interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error: undefined;
  refetchUser: () => void;
}

// context with default values
const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  isError: false,
  error: undefined,
  refetchUser: () => {},
});

// provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, error, refetch } =
    useFetchData<BackendResponse>({
      method: "GET",
      url: "/user/me",
      queryKey: ["user"],
      enabled: false, // avoid auto-fetching
    });

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        isError,
        error,
        isLoading,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
