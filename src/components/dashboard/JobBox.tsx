"use client";

import { filterIcon } from "@/image";
import { Query } from "@/network/constant";
import {
  getUserDetails,
  makerGetJobs,
  makerGetSavedJobs,
  saveJobs,
} from "@/network/dashboard";
import Button from "@/shared/Button";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import LoaderSvg from "@/shared/LoaderSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
dayjs.extend(relativeTime);

export default function JobBox() {
  const route = useRouter();
  const [fetchSaved, setFetchSaved] = useState<boolean>(false);

  //User Details
  const { data: dataMakerDetails } = useQuery({
    queryFn: getUserDetails,
    queryKey: [Query.GET_USER_DETAILS_QUERY],
  });
  const userData =
    dataMakerDetails &&
    dataMakerDetails.status === true &&
    !("error" in dataMakerDetails)
      ? dataMakerDetails.data
      : null;

  //Jobs
  const { data: dataJobs, isPending: isPendingJobs } = useQuery({
    queryFn: makerGetJobs,
    queryKey: [Query.MAKER_GET_JOBS_QUERY],
  });
  const recentJobs =
    dataJobs && dataJobs.status === true && !("error" in dataJobs)
      ? dataJobs.data
      : null;

  //Saved Jobs
  const { data: dataSavedJobs, isPending: isPendingSavedJobs } = useQuery({
    queryFn: makerGetSavedJobs,
    queryKey: [Query.GET_SAVED_JOBS_QUERY],
  });

  const savedJobs =
    dataSavedJobs &&
    dataSavedJobs.status === true &&
    !("error" in dataSavedJobs)
      ? dataSavedJobs.data
      : null;

  const jobs = fetchSaved ? savedJobs : recentJobs;

  //Handle Save Jobs
  const { mutateAsync } = useMutation({
    mutationFn: saveJobs,
  });
  const handleSave = async (id: string) => {
    const res = await mutateAsync({
      jobId: id,
    });
    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else {
      toast.success(res.message);
    }
  };

  return (
    <div className="px-[10rem] py-[5rem] w-[100%]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[3rem] font-bold">
            Welcome {userData?.creator?.fullName}, 👋
          </p>
          <p className="text-[2rem] text-astraTextGrey ">
            Here are the available jobs waiting for you to apply.
          </p>
        </div>
        <ButtonWithIcon
          icon={filterIcon}
          action="Filter & Sort"
          handleClick={() => {}}
          loaderColor=""
          containerStyle="py-[1.4rem] px-[1.6rem] border rounded-[1.4rem]"
          fontStyle="text-[1.6rem]"
          iconWidth="w-[2.4rem]"
        />
      </div>
      <div className="flex gap-x-[2rem] items-center h-[max-content] w-[max-content] border-b mx-auto mt-[4rem] mb-[3rem]">
        <p
          className={`px-[2rem] py-[1rem] text-[1.8rem] ${
            fetchSaved || "border-b-black border-b-[2px]"
          }  cursor-pointer`}
          onClick={() => {
            setFetchSaved(false);
          }}
        >
          Most Recent
        </p>
        <p
          className={`px-[2rem] py-[1rem] text-[1.8rem] cursor-pointer ${
            fetchSaved && "border-b-black border-b-[2px]"
          }`}
          onClick={() => {
            setFetchSaved(true);
          }}
        >
          Saved Jobs{" "}
          {`${
            savedJobs && savedJobs.length > 0 ? `(${savedJobs.length})` : ""
          }`}
        </p>
      </div>
      {isPendingJobs || isPendingSavedJobs ? (
        <div className="flex justify-center items-center py-[3rem]">
          <LoaderSvg color="#000000" />
        </div>
      ) : jobs && jobs.length > 0 ? (
        jobs.map((item, index) => (
          <div
            key={index}
            className="p-[3rem] border rounded-[1rem] w-[100%] mb-[3rem]"
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <div className="h-[5px] w-[5px] rounded-full bg-astraBlue mr-[.5rem]"></div>
                  <p className="text-[1.3rem] text-astraBlue">
                    Posted {dayjs(item.createdAt).fromNow()}
                  </p>
                </div>
                <p className="text-[2rem] mt-[2rem] mb-[1.5rem]">
                  {item?.design?.outfitName}
                </p>
                <div className="flex items-center gap-x-[2.5rem]">
                  <p className="text-[1.5rem] text-astraTextGrey">
                    No of Pieces: {item?.design?.pieceNumber}
                  </p>
                  <p className="text-[1.5rem] text-astraTextGrey">
                    Due Date: {dayjs(item.timeline).format("DD MMMM, YYYY")}
                  </p>
                  <p className="text-[1.5rem] text-astraTextGrey">
                    Set Budget: ${""}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleSave(item?.id)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-end mt-[2.2rem]">
              <p className="text-[1.8rem] text-astraTextGrey w-[70%]">
                {item.description}
              </p>
              <Button
                action="View Details"
                fontSize="text-[1.4rem]"
                width="w-[15rem]"
                handleClick={() => {
                  route.push(`/job-details?id=${item.id}`);
                }}
                rounded
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-[1.6rem] py-[4rem] italic flex justify-center items-center">
          No {fetchSaved && "Saved"} Jobs Yet
        </div>
      )}
    </div>
  );
}
