/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetchData } from "../hooks/useApi";

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

// user context type
interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  refetchUser: () => void;
}

// context with default values
const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  isError: false,
  refetchUser: () => {},
});

// provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    data,
    isLoading: fetchLoading,
    isError: fetchError,
    refetch,
  } = useFetchData<BackendResponse>({
    method: "GET",
    url: "/me",
    queryKey: ["user"],
    enabled: false, // avoid auto-fetching
  });

  useEffect(() => {
    refetch(); // refetch when the components mount
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await refetch();
        if (res) {
          setUser(res.data?.user);
        }
        // console.log("USER:", user);
      } catch (error: any) {
        // console.log("Error fetching User:", error);
        setIsError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data?.user, isError, isLoading, refetchUser: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
