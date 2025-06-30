// AUTH POST/PUT REQUESTS

import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "../useApi";
import { TUser } from "@/types/user.types";
import {
  LOGIN,
  RESENDVERIFICATIONCODE,
  SIGNOUT,
  SIGNUP,
  VERIFICATION,
} from "@/config/auth.endpoints";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { FORGOTPASSWORD, RESETPASSWORD } from "@/config/user.endpoints";

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  // login user
  const {
    mutate: loginUser,
    isPending: loginUserLoading,
    isSuccess: loginSuccess,
  } = useMutateData<
    {
      user: TUser;
      expiresAt: number;
      accessToken: string;
      refreshToken: string;
      loggedInToken: string;
    },
    { email: string; password: string }
  >({
    method: "POST",
    mutationKey: ["loginUser"],
    url: LOGIN,
    skipAuthRefresh: true,
    onSuccess: async (response) => {
      if (!response.success) return;

      toast.success("Welcome to Trust HealthCare!", {
        description: response.message,
        duration: 4000,
      });

      const { accessToken, refreshToken, loggedInToken, expiresAt, user } =
        response?.data;

      const res = await fetch("/api/set-cookies", {
        method: "POST",
        body: JSON.stringify({ accessToken, refreshToken, loggedInToken }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to set login cookie", {
          description: "Something went wrong",
          duration: 4000,
        });
        return;
      }

      setUser(user);

      localStorage.setItem("access_token_expiry", String(expiresAt));

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // logout user
  const { mutate: logoutUser } = useMutateData<null, null>({
    method: "POST",
    mutationKey: ["logoutUser"],
    url: SIGNOUT,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      setUser(null);

      toast.success(response.message, {
        description: "Hope to see you soon",
        duration: 4000,
      });

      localStorage.removeItem("access_token_expiry");

      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // sign up user
  const {
    mutate: registerUser,
    isSuccess: registerUserSuccess,
    isError: registerUserError,
    isPending: registerUserLoading,
  } = useMutateData<null, { name: string; email: string; password: string }>({
    method: "POST",
    mutationKey: ["registerUser"],
    url: SIGNUP,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success("Verification code sent", {
        description: response.message,
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // account verification
  const {
    mutate: verifyAccount,
    isSuccess: verifyAccountSuccess,
    isError: verifyAccountError,
    isPending: verifyAccountLoading,
  } = useMutateData<null, { verificationCode: string }>({
    method: "POST",
    mutationKey: ["account-verification"],
    url: VERIFICATION,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success("Account Verified", {
        description: response.message,
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // resend verification code
  const {
    mutate: resendCode,
    isSuccess: resendCodeSuccess,
    isError: resendCodeError,
    isPending: resendCodeLoading,
  } = useMutateData<null, null>({
    method: "POST",
    mutationKey: ["resend-verification-code"],
    url: RESENDVERIFICATIONCODE,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success("Verification Code Resent", {
        description: response.message,
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // reset password
  const {
    mutate: forgotPassword,
    isSuccess: forgotPasswordSuccess,
    isError: forgotPasswordError,
    isPending: forgotPasswordLoading,
  } = useMutateData<null, { email: string }>({
    method: "POST",
    mutationKey: ["forgot-password"],
    url: FORGOTPASSWORD,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success("Password reset code sent", {
        description: response.message,
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  // forgot password
  const {
    mutate: resetPassword,
    isSuccess: resetPasswordSuccess,
    isError: resetPasswordError,
    isPending: resetPasswordLoading,
  } = useMutateData<null, { resetCode: string; password: string }>({
    method: "POST",
    mutationKey: ["reset-password"],
    url: RESETPASSWORD,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success("Password reset code sent", {
        description: response.message,
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Something went wrong",
        duration: 4000,
      });
    },
  });

  return {
    loginDomain: {
      loginUser,
      loginUserLoading,
      loginSuccess,
    },
    logoutDomain: { logoutUser },
    registerDomain: {
      registerUser,
      registerUserSuccess,
      registerUserError,
      registerUserLoading,
    },
    verifyAccountDomain: {
      verifyAccount,
      verifyAccountSuccess,
      verifyAccountError,
      verifyAccountLoading,
    },
    resendCodeDomain: {
      resendCode,
      resendCodeSuccess,
      resendCodeError,
      resendCodeLoading,
    },
    forgotPasswordDomain: {
      forgotPassword,
      forgotPasswordSuccess,
      forgotPasswordError,
      forgotPasswordLoading,
    },
    resetPasswordDomain: {
      resetPassword,
      resetPasswordSuccess,
      resetPasswordError,
      resetPasswordLoading,
    },
  };
};
