import { TUser } from "./user.types";

// refresh backend response type
export interface AuthRefreshBackendResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: TUser;
  expiresAt: string;
  accessToken: string;
  loggedInToken: string;
  refreshToken: string;
}

export interface AccessTokenClearResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    expiresAt: string;
    accessToken: string;
    loggedInToken: string;
    refreshToken: string;
  };
  statusCode: number;
}
