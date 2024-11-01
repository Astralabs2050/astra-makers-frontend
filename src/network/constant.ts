export const TOKEN_NAME = "ASTRA_TOKEN" as const;
export const EMAIL = "EMAIL" as const;
export const PASSWORD_RESET_TOKEN = "PASSWORD_RESET_TOKEN" as const;
export const API_URL = "http://13.51.197.147:3000/" as const;

const SIGNUP = "auth/register/creator/step-1" as const;
const VERIFY_OTP = "auth/otp-verification" as const;
const RESEND_OTP = "auth/resend-otp";
const COMPLETE_SIGNUP = "auth/register/creator/step-2" as const;
const LOGIN = "auth/login" as const;

export const Endpoints = {
  SIGNUP,
  VERIFY_OTP,
  COMPLETE_SIGNUP,
  LOGIN,
  RESEND_OTP,
};

export const Query = {};
