import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "./helpers";
import { SERVER_URI } from "@/config/api";
import { isServerOnline } from "./isServerOnline";

const axiosInstance = axios.create({
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
axiosInstance.interceptors.request.use(
  async (config) => {
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
        console.log("About to expire.. Refreshing Tokens....");

        // 1. Call refresh route and get tokens
        const refreshResponse = await axiosInstance.get(
          "/auth/refresh-tokens",
          {
            skipAuthRefresh: true,
          } as CustomAxiosRequestConfig
        );

        const { accessToken, refreshToken, loggedInToken, expiresAt } =
          refreshResponse.data;

        // 2. Send tokens to your cookie API route
        await fetch("/api/set-cookies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ accessToken, refreshToken, loggedInToken }),
        });

        // 3. Update expiry tracking
        localStorage.setItem("access_token_expiry", expiresAt);

        // 4. force reload
        window.location.reload();
      } catch (error) {
        console.error("Failed to refresh token proactively", error);
      }
    }

    return customConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
          console.log("Request Failed.. Refreshing tokens...");

          // 1. Call refresh route and get new tokens
          const refreshResponse = await axiosInstance.get(
            "/auth/refresh-tokens",
            {
              skipAuthRefresh: true,
            } as CustomAxiosRequestConfig
          );

          const { accessToken, refreshToken, loggedInToken, expiresAt } =
            refreshResponse.data;

          // 2. Set new cookies via your API route
          await fetch("/api/set-cookies", {
            method: "POST",
            body: JSON.stringify({
              accessToken,
              refreshToken,
              loggedInToken,
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          // 3. Optionally update expiry tracking in localStorage
          localStorage.setItem("access_token_expiry", expiresAt);

          // force reload
          window.location.reload();

          // 4. Retry original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDM2NWM2YWItMDI4Ni00NjdhLWI5NmUtODI0NDRkYTA1YTcyIiwibmFtZSI6IkZhbG9kZSBUb2JpIiwiZW1haWwiOiJnYWJyaWVsdG9iaWxvYmExMUBnbWFpbC5jb20iLCJhdmF0YXIiOm51bGwsInJvbGUiOlsidXNlciJdLCJ2ZXJpZmllZCI6dHJ1ZSwibGFzdExvZ2luIjoiMjAyNS0wNi0yMlQyMjoxMjozMy4xNjRaIiwibGFzdFBhc3N3b3JkUmVzZXQiOm51bGwsImRvY3RvcklkIjpudWxsLCJzaWduZWRJbkFzIjoidXNlciJ9LCJpYXQiOjE3NTA2MzIxOTQsImV4cCI6MTc1MTA2NDE5NH0.kyLx7s9atz0pgzVxIu3Yrrm4dA6SAP9qrwfsk6h7HhE

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDM2NWM2YWItMDI4Ni00NjdhLWI5NmUtODI0NDRkYTA1YTcyIiwibmFtZSI6IkZhbG9kZSBUb2JpIiwiZW1haWwiOiJnYWJyaWVsdG9iaWxvYmExMUBnbWFpbC5jb20iLCJhdmF0YXIiOm51bGwsInJvbGUiOlsidXNlciJdLCJ2ZXJpZmllZCI6dHJ1ZSwibGFzdExvZ2luIjoiMjAyNS0wNi0yMlQyMjoxMjozMy4xNjRaIiwibGFzdFBhc3N3b3JkUmVzZXQiOm51bGwsImRvY3RvcklkIjpudWxsLCJzaWduZWRJbkFzIjoidXNlciJ9LCJpYXQiOjE3NTA2MzIyNjAsImV4cCI6MTc1MTA2NDI2MH0.nDg9DmfVdn71GG4FSJcwfZXWCyPETOBZWGudzWxYVWQ

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDM2NWM2YWItMDI4Ni00NjdhLWI5NmUtODI0NDRkYTA1YTcyIiwibmFtZSI6IkZhbG9kZSBUb2JpIiwiZW1haWwiOiJnYWJyaWVsdG9iaWxvYmExMUBnbWFpbC5jb20iLCJhdmF0YXIiOm51bGwsInJvbGUiOlsidXNlciJdLCJ2ZXJpZmllZCI6dHJ1ZSwibGFzdExvZ2luIjoiMjAyNS0wNi0yMlQyMjoxMjozMy4xNjRaIiwibGFzdFBhc3N3b3JkUmVzZXQiOm51bGwsImRvY3RvcklkIjpudWxsLCJzaWduZWRJbkFzIjoidXNlciJ9LCJpYXQiOjE3NTA2MzIzMDcsImV4cCI6MTc1MTA2NDMwN30.yP_Gig9lX3s-TLkZmIkZGD2IClPWYvjl6tw8H60dY_w
