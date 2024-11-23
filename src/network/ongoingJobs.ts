import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

export interface Job {
  id: string;
  description: string;
  timeline: string; // ISO 8601 date string
  status: boolean;
  timelineStatus: string | null;
  manufacturer: boolean;
  makerId: string | null;
  userId: string;
  designId: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  design: Design;
  user: User;
}

export interface Design {
  id: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  publicKey: string | null;
  creatorType: string;
  userId: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface User {
  id: string;
  email: string;
  password: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null; // ISO 8601 date string or null
  otp: string;
  isOtpVerified: boolean;
  otpCreatedAt: string | null; // ISO 8601 date string or null
  isOtpExp: boolean;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

interface onGoingJobsData {
  filterStatus: string;
  userId: string;
}

export const getOngoingJobs = async (
  payload: onGoingJobsData
): Promise<BaseResponse<Job[]>> => {
  return API.get<Job[]>(
    `${Endpoints.GET_ONGOING_JOBS}?status=${payload.filterStatus}&id=${payload.userId}`
  );
};
