import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

interface Media {
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

interface Piece {
  id: string;
  designId: string;
  pieceType: string;
  designNumber: number;
  piecePrice: number | null;
  modelingPrice: number | null;
  createdAt: string;
  updatedAt: string;
  media: Media[];
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
  media: Media[];
  pieces: Piece[];
}

interface Job {
  id: string;
  jobId: string;
  userId: string;
  amount: number;
  status: boolean;
  negotiation: boolean;
  wallet: string;
  minAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
  id: string;
  username: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  otp: string;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
  creator: string | null;
  brand: Brand;
}

interface JobData {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  timelineStatus: string;
  manufacturer: boolean;
  makerId: string;
  userId: string;
  designId: string;
  createdAt: string;
  updatedAt: string;
  design: Design;
  job: Job[];
  user: User;
}

interface onGoingJobsData {
  filterStatus: string;
  userId: string;
}

export const getOngoingJobs = async (
  payload: onGoingJobsData
): Promise<BaseResponse<JobData[]>> => {
  return API.get<JobData[]>(
    `${Endpoints.GET_ONGOING_JOBS}?status=${payload.filterStatus}&id=${payload.userId}`
  );
};
