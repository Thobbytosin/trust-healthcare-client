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
}

export interface AccessTokenClearResponse {
  success: boolean;
  message: string;
}
