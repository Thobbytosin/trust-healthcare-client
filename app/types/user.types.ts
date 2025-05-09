export interface User {
  name: string;
  email: string;
  verified: boolean;
  lastLogin: Date;
  lastPasswordReset: Date;
  role: [string];
}

// user backend response type
export interface UserBackendResponse {
  success: boolean;
  message: string;
  user: User;
}
