"use client";

import { actionIcon, filterIcon, report, withdrawIcon } from "@/image";
import { Query } from "@/network/constant";
import { getOngoingJobs } from "@/network/ongoingJobs";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import LoaderSvg from "@/shared/LoaderSvg";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function JobBox({
  status,
  dueDate,
  title,
  brandName,
  applicationDate,
}: {
  status: string;
  dueDate: string;
  title: string;
  brandName: string;
  applicationDate: string;
}) {
  const [popUp, setPopup] = useState<boolean>(false);
  return (
    <div
      className="border rounded-[1rem] min-w-[30rem] min-h-[25rem] p-[2rem]"
      onClick={() => setPopup(false)}
    >
      <div className={`flex items-center gap-x-[.5rem]`}>
        <div
          className={`rounded-full w-[.5rem] h-[.5rem] ${
            status === "Withdrawn" && "bg-astraTextGrey"
          } ${status === "Awaiting decision" && "bg-astraBlue"} ${
            status === "Selected by Creator" && "bg-astraGreen"
          } ${status === "Not selected by creator" && "bg-astraRed"}
          ${status === "Completed" && "bg-astraGreen"} ${
            status === "In progress" && "bg-astraRed"
          }`}
        ></div>
        <p
          className={`text-[1.3rem] ${
            status === "Withdrawn" && "text-astraTextGrey"
          } ${status === "Awaiting decision" && "text-astraBlue"} ${
            status === "Selected by Creator" && "text-astraGreen"
          } ${status === "Not selected by creator" && "text-astraRed"}
          ${status === "Completed" && "text-astraGreen"} ${
            status === "In progress" && "text-astraRed"
          }`}
        >
          {status === "In progress" ? `Due on ${dueDate}` : status}
        </p>
      </div>
      <p className="text-[1.8rem] w-[80%] mt-[2.2rem] mb-[1.8rem]">{title}</p>
      <p className="text-[1.5rem] text-astraTextGrey">{brandName}</p>
      <hr className="my-[2rem]" />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[1.3rem]">Applied on:</p>
          <p className="text-[1.5rem]">{applicationDate}</p>
        </div>
        <div className="flex relative">
          <Image
            src={actionIcon}
            alt="logo"
            height={24}
            width={24}
            onClick={(e) => {
              e.stopPropagation();
              setPopup(true);
            }}
            className="cursor-pointer"
          />
          {popUp && (
            <div className="bg-white w-[26.9rem]  h-[9.6rem] absolute z-50 left-0 rounded-[10px] px-[3rem] py-[1.5rem]">
              <div className="flex gap-x-[1.5rem] items-center mb-[3rem] cursor-pointer">
                <div>
                  <Image src={withdrawIcon} alt="" height={18} width={18} />
                </div>
                <p className="text-[1.3rem] text-astraRed font-bold">
                  Withdraw Application
                </p>
              </div>
              <div className="flex gap-x-[1.5rem] items-center cursor-pointer">
                <div>
                  <Image src={report} alt="" height={20} width={20} />
                </div>
                <p className="text-[1.3rem]  font-bold">Report Job</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OngoingJobBox() {
  const [category, setCategory] = useState<string>("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isPending } = useQuery({
    queryFn: () => getOngoingJobs({ filterStatus: category, userId: id ?? "" }),
    queryKey: [Query.GET_ONGOING_JOBS_QUERY, category],
  });

  const ongoingJobs =
    data && data.status === true && !("error" in data) ? data.data : null;
  return (
    <div className="px-[10rem] py-[5rem] w-[100%]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[3rem] font-bold">Your Ongoing Jobs</p>
          <p className="text-[2rem] text-astraTextGrey ">
            Your current ongoing jobs are here.
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
      <div className="flex items-center gap-x-[2rem] mt-[5rem]">
        <p
          className={`text-[1.6rem] flex items-center justify-center px-[1.8rem] py-[1.2rem] rounded-full font-[500] cursor-pointer min-w-[14rem] ${
            category === "" && "bg-astraSilver"
          }`}
          onClick={() => setCategory("")}
        >
          My Applications
        </p>
        <p
          className={`text-[1.6rem] flex items-center justify-center px-auto py-[1.2rem] rounded-full font-[500] cursor-pointer  min-w-[14rem] ${
            category === "ongoing" && "bg-astraSilver"
          }`}
          onClick={() => setCategory("ongoing")}
        >
          Ongoing Jobs
        </p>
        <p
          className={`text-[1.6rem] flex items-center justify-center px-[1.8rem] py-[1.2rem] rounded-full font-[500] cursor-pointer  min-w-[14rem] ${
            category === "completed" && "bg-astraSilver"
          }`}
          onClick={() => setCategory("completed")}
        >
          Completed
        </p>
        {/* <p
          className={`text-[1.6rem] flex items-center justify-center py-[1.2rem] rounded-full font-[500] cursor-pointer min-w-[14rem] ${
            category === "all" && "bg-astraSilver"
          }`}
          onClick={() => setCategory("")}
        >
          All Jobs
        </p> */}
      </div>
      <hr className="mt-[1.5rem] mb-[5rem]" />
      <div className="flex flex-wrap overflow-x-hidden gap-[1.8rem]">
        {isPending ? (
          <div className="flex items-center justify-center py-[4rem] w-[100%]">
            <LoaderSvg color="#000000" />
          </div>
        ) : (
          ongoingJobs?.map((item, index) => (
            <JobBox
              key={index}
              status="Awaiting decision"
              dueDate={item.timeline}
              title={item?.design?.outfitName}
              brandName={item.user?.brand?.username}
              applicationDate={dayjs(item.createdAt).format(
                "MMM D, YYYY h:mm A"
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}
