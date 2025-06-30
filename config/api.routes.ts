export const API_AUTH_PATHS = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  SIGNOUT: "/auth/signout",
  REFRESHTOKEN: "/auth/refresh-tokens",
  VERIFICATION: "/auth/account-verification",
  RESENDVERIFICATIONCODE: "/auth/resend-verification-code",
  CLEARACCESSTOKEN: "/auth/clear-access-token",
  VALIDATETOKEN: "/auth/validate-token",
};

export const API_USER_PATHS = {
  FORGOTPASSWORD: "/user/forgot-password",
  RESETPASSWORD: "/user/reset-password",
  FETCHUSER: "/user/me",
};

export const API_DOCTOR_PATHS = {
  DOCTORSLANDINGPAGE: "/doctor/doctors-list-unauthenticated",
  GETDOCTOR: "/doctor/get-doctor",
  GETALLDOCTORS: "/doctor/get-all-doctors",
  GETDOCTORAVAILABLEDAYSLOTS: "/doctor/available-slots",
};

export const API_SUGGESTION_PATHS = {
  GETSEARCHSUGGESTIONS: "/suggestion/fetch-suggestions",
  SAVESEARCHSUGGESTION: "/suggestion/save-suggestion",
};
