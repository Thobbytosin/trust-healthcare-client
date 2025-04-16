import axios, { AxiosRequestConfig } from "axios";
import { SERVER_URI } from "./uri";

const axiosInstance = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

// routes to skip for refresh logic
// const skipRefreshRoutes = [
//   "/signup",
//   "/account-verification",
//   "/resend-verification-code",
//   "/login",
//   "/get-some-doctors-free",
//   "/forgot-password",
//   "/reset-password",
// ];

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    // check for token expiration
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.get("/refresh-tokens");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
