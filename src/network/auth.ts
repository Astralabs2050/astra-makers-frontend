import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

export interface SignUpOneRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface VerifyOtpRequest {
  otp: string;
  email: string;
}

export interface SignUpTwoRequest {
  email: string;
  profileImage: string;
  location: string;
  category: string[];
  skills: string[];
  creatorType: string;
  work: {
    title: string;
    description: string;
    companyName: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
  }[];
  projects: {
    title: string;
    projectDescription: string;
    tags: string[];
    image: string[];
  }[];
}
export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignInResponse {
  id: string;
  email: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  isOtpVerified: boolean;
  otpCreatedAt: string;
  isOtpExp: boolean;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
  token: string;
}
export interface ResendOtpRequest {
  email: string;
}
interface ResetPasswordRequest {
  otp: string;
  email: string;
  password: string;
}
export const signupStepOne = async (
  payload: SignUpOneRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SignUpOneRequest, unknown>(Endpoints.SIGNUP, payload);
};

export const verifyOTP = async (
  payload: VerifyOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<VerifyOtpRequest, unknown>(Endpoints.VERIFY_OTP, payload);
};

export const signupStepTwo = async (
  payload: SignUpTwoRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SignUpTwoRequest, unknown>(
    Endpoints.COMPLETE_SIGNUP,
    payload
  );
};

export const login = async (
  payload: SignInRequest
): Promise<BaseResponse<SignInResponse>> => {
  return API.post<SignInRequest, SignInResponse>(Endpoints.LOGIN, payload);
};

export const resendOtp = async (
  payload: ResendOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<ResendOtpRequest, unknown>(Endpoints.RESEND_OTP, payload);
};

export const forgotPassword = async (
  payload: ResendOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<ResendOtpRequest, unknown>(
    Endpoints.FORGOT_PASSWORD,
    payload
  );
};

export const resetPassword = async (
  payload: ResetPasswordRequest
): Promise<BaseResponse<unknown>> => {
  return API.patch<ResetPasswordRequest, unknown>(
    Endpoints.RESET_PASSWORD,
    payload
  );
};
