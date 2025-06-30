export type TUser = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  lastLogin: Date;
  lastPasswordReset: Date | null;
  role: [string];
  doctorId: string | null;
  signedInAs: string;
  expiresAt?: number;
  accessToken?: string;
  refreshToken?: string;
  loggedInToken?: string;
};

export interface IUserResponse {
  success: true;
  message: string;
  data: TUser;
  statusCode: number;
}
