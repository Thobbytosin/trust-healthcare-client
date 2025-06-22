import { User } from "./user.types";

// refresh backend response type
export interface AuthRefreshBackendResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  expiresAt: string;
  accessToken: string;
  loggedInToken: string;
  refreshToken: string;
}

export interface AccessTokenClearResponse {
  success: boolean;
  message: string;
}
