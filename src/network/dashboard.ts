import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

interface UserData {
  id: string;
  email: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  otp: string;
  isOtpVerified: boolean;
  otpCreatedAt: string;
  isOtpExp: boolean;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
  brand: string | null;
  media: Media[];
}

interface Creator {
  id: string;
  userId: string;
  fullName: string;
  location: string;
  category: string[];
  skills: string[];
  creatorType: string;
  createdAt: string;
  updatedAt: string;
}

interface Media {
  id: string;
  link: string;
  mediaType: string;
  userId: string;
  designId: string | null;
  projectId: string | null;
  pieceId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface JobData {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  manufacturer: boolean;
  userId: string;
  designId: string;
  createdAt: string;
  updatedAt: string;
  design: Design;
  user: User;
}

interface Design {
  id: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  publicKey: string | null;
  creatorType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  otp: string;
  isOtpVerified: boolean;
  otpCreatedAt: string | null;
  isOtpExp: boolean;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
}
interface SaveJobRequest {
  jobId: string;
}

interface SingleMedia {
  id: string;
  link: string;
  mediaType: string;
  userId: string | null;
  designId: string;
  projectId: string | null;
  pieceId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SinglePiece {
  id: string;
  designId: string;
  pieceType: string;
  designNumber: number;
  piecePrice: number;
  modelingPrice: number | null;
  createdAt: string;
  updatedAt: string;
  media: Media[];
}

interface SingleDesign {
  id: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  publicKey: string | null;
  creatorType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  media: SingleMedia[];
  pieces: SinglePiece[];
}

interface SingleUser {
  id: string;
  email: string;
  password: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  otp: string;
  isOtpVerified: boolean;
  otpCreatedAt: string | null;
  isOtpExp: boolean;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SingleJobData {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  manufacturer: boolean;
  userId: string;
  designId: string;
  createdAt: string;
  updatedAt: string;
  design: SingleDesign;
  user: SingleUser;
}

interface ProjectMedia {
  id: string;
  link: string;
  mediaType: string;
  userId: string | null;
  designId: string | null;
  projectId: string;
  pieceId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  creatorId: string;
  title: string;
  projectDescription: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  media: ProjectMedia[];
}

interface ApplyToJobRequest {
  jobId: string;
  amount: number;
  minAmount: number;
  projectIds: string[];
}

export const getUserDetails = async (): Promise<BaseResponse<UserData>> => {
  return API.get<UserData>(Endpoints.GET_USER_DETAILS);
};

export const makerGetJobs = async (): Promise<BaseResponse<JobData[]>> => {
  return API.get<JobData[]>(Endpoints.MAKER_GET_JOBS);
};

export const makerGetSavedJobs = async (): Promise<BaseResponse<JobData[]>> => {
  return API.get<JobData[]>(Endpoints.GET_SAVED_JOBS);
};

export const saveJobs = async (
  payload: SaveJobRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SaveJobRequest, unknown>(Endpoints.GET_SAVED_JOBS, payload);
};

export const getSingleJob = async (
  id: string
): Promise<BaseResponse<SingleJobData>> => {
  return API.get<SingleJobData>(`${Endpoints.GET_SINGLE_JOB}${id}`);
};

export const getUserProjects = async (): Promise<BaseResponse<Project[]>> => {
  return API.get<Project[]>(`${Endpoints.GET_USER_PROJECTS}`);
};

export const applyToJob = async (
  payload: ApplyToJobRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SaveJobRequest, unknown>(Endpoints.APPLY_TO_JOB, payload);
};
