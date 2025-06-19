import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "./helpers";
import { SERVER_URI } from "@/config/api";
import { isServerOnline } from "./isServerOnline";

const axiosInstance = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

const bareAxios = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
  headers: any;
}
// check token expiry
const isAccessTokenExpiringSoon = () => {
  if (typeof window === "undefined") return false; // Server-side guard

  const expiry = localStorage.getItem("access_token_expiry");
  if (!expiry) return false;
  // const expiresIn = parseInt(expiry)
  const isExpiringSoon =
    new Date(+expiry).getTime() - Date.now() < 5 * 60 * 1000;

  return isExpiringSoon;
};

// for outgoing requests
axiosInstance.interceptors.request.use(async (config) => {
  const customConfig = config as CustomAxiosRequestConfig;

  // check server
  const online = await isServerOnline();
  if (!online) {
    return Promise.reject(new Error("Server is offline"));
  }

  const consent = getCookie("cookie_consent");

  // sets the cookie consent in all request headers
  customConfig.headers = {
    ...(customConfig.headers || {}),
    ...(consent ? { "x-cookie-consent": consent } : {}),
  };

  // refresh only if route needs refresh and access token is expiring soon
  if (!customConfig.skipAuthRefresh && isAccessTokenExpiringSoon()) {
    try {
      console.log(
        "THE ACCESS TOKEN IS EXPIRING SOON SO I AM CALLING THE REFRESH TOKEN"
      );
      await axiosInstance.get("/auth/refresh-tokens", {
        skipAuthRefresh: true,
      } as CustomAxiosRequestConfig);

      // set new expiry
      localStorage.setItem(
        "access_token_expiry",
        (Date.now() + 30 * 60 * 1000).toString() // since access token expires every 30 mins
      );
    } catch (error) {
      console.error("Failed to refresh token proactively", error);
    }
  }

  return customConfig;
});

// for incoming responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // check server
    const online = await isServerOnline();
    if (!online) {
      return Promise.reject(new Error("Server is offline"));
    }

    // check for skip auth refresh
    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    // check for token expiration
    if (error.response?.status === 401 || error.response?.status === 400) {
      if (!originalRequest._retry) {
        originalRequest._retry = true; // to avoid infinte loops
        try {
          console.log(
            "ORIGINAL REQUEST FAILED SO I AM REFRSHING THE TOKEN AND RECALLING THE FAILED REQUEST AGAIN"
          );

          await axiosInstance.get("/auth/refresh-tokens", {
            skipAuthRefresh: true,
          } as CustomAxiosRequestConfig); // refresh

          // set new expiry
          localStorage.setItem(
            "access_token_expiry",
            (Date.now() + 30 * 60 * 1000).toString()
          );

          return axiosInstance(originalRequest); // resend original request
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
