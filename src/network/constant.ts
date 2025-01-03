export const TOKEN_NAME = "ASTRA_TOKEN" as const;
export const EMAIL = "EMAIL" as const;
export const RESET_PASSWORD_EMAIL = "RESET_PASSWORD_EMAIL";
export const USER_PROFILE = "USER_PROFILE";
export const API_URL = "https://render-backend-drm4.onrender.com" as const;

const SIGNUP = "auth/register/creator/step-1" as const;
const VERIFY_OTP = "auth/otp-verification" as const;
const RESEND_OTP = "auth/resend-otp" as const;
const COMPLETE_SIGNUP = "auth/register/creator/step-2" as const;
const LOGIN = "auth/login" as const;
const FORGOT_PASSWORD = "auth/forgot-password" as const;
const RESET_PASSWORD = "auth/reset-password" as const;
const GET_USER_DETAILS = "user/self" as const;
const MAKER_GET_JOBS = "job/get-all-job" as const;
const GET_SAVED_JOBS = "job/save-job" as const;
const GET_SINGLE_JOB = "job/get-job/" as const;
const GET_USER_PROJECTS = "user/project" as const;
const APPLY_TO_JOB = "job/apply-job" as const;
const GET_ONGOING_JOBS = "job/ongoing-job-application";

const GET_USER_DETAILS_QUERY = "GET_USER_DETAILS_QUERY" as const;
const MAKER_GET_JOBS_QUERY = "MAKER_GET_JOBS_QUERY" as const;
const GET_SAVED_JOBS_QUERY = "GET_SAVED_JOBS_QUERY" as const;
const GET_SINGLE_JOB_QUERY = "GET_SINGLE_JOB_QUERY" as const;
const GET_USER_PROJECTS_QUERY = "GET_USER_PROJECTS_QUERY" as const;
const GET_ONGOING_JOBS_QUERY = "GET_ONGOING_JOBS_QUERY" as const;
export const Endpoints = {
  SIGNUP,
  VERIFY_OTP,
  COMPLETE_SIGNUP,
  LOGIN,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_USER_DETAILS,
  MAKER_GET_JOBS,
  GET_SAVED_JOBS,
  GET_SINGLE_JOB,
  GET_USER_PROJECTS,
  APPLY_TO_JOB,
  GET_ONGOING_JOBS,
};

export const Query = {
  GET_USER_DETAILS_QUERY,
  GET_ONGOING_JOBS_QUERY,
  MAKER_GET_JOBS_QUERY,
  GET_SAVED_JOBS_QUERY,
  GET_SINGLE_JOB_QUERY,
  GET_USER_PROJECTS_QUERY,
};
