"use client";

import { filterIcon, heartIcon } from "@/image";
import Button from "@/shared/Button";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JobBox() {
  const route = useRouter();
  return (
    <div className="px-[10rem] py-[5rem] w-[100%]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[3rem] font-bold">Welcome Tomiwa, 👋</p>
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
        <p className="px-[2rem] py-[1rem] text-[1.8rem] border-b-black border-b-[2px] cursor-pointer">
          Most Recent
        </p>
        <p className="px-[2rem] py-[1rem] text-[1.8rem] cursor-pointer">
          Saved Jobs (2)
        </p>
      </div>
      {[
        {
          timePosted: "10 minutes ago",
          event: "AstroWRLD Summer II",
          numberOfPiece: "3",
          dueDate: "AstroWRLD Summer II",
          budget: "100",
          intro:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          timePosted: "10 minutes ago",
          event: "AstroWRLD Summer II",
          numberOfPiece: "3",
          dueDate: "AstroWRLD Summer II",
          budget: "100",
          intro:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          timePosted: "10 minutes ago",
          event: "AstroWRLD Summer II",
          numberOfPiece: "3",
          dueDate: "AstroWRLD Summer II",
          budget: "100",
          intro:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          timePosted: "10 minutes ago",
          event: "AstroWRLD Summer II",
          numberOfPiece: "3",
          dueDate: "AstroWRLD Summer II",
          budget: "100",
          intro:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="p-[3rem] border rounded-[1rem] w-[100%] mb-[3rem]"
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                <div className="h-[5px] w-[5px] rounded-full bg-astraBlue mr-[.5rem]"></div>
                <p className="text-[1.3rem] text-astraBlue">
                  Posted {item.timePosted}
                </p>
              </div>
              <p className="text-[2rem] mt-[2rem] mb-[1.5rem]">{item.event}</p>
              <div className="flex items-center gap-x-[2.5rem]">
                <p className="text-[1.5rem] text-astraTextGrey">
                  No of Pieces: {item.numberOfPiece}
                </p>
                <p className="text-[1.5rem] text-astraTextGrey">
                  Due Date: {item.dueDate}
                </p>
                <p className="text-[1.5rem] text-astraTextGrey">
                  Set Budget: ${item.budget}
                </p>
              </div>
            </div>
            <div>
              <Image
                src={heartIcon}
                alt=""
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between items-end mt-[2.2rem]">
            <p className="text-[1.8rem] text-astraTextGrey w-[70%]">
              {item.intro}
            </p>
            <Button
              action="View Details"
              fontSize="text-[1.4rem]"
              width="w-[15rem]"
              handleClick={() => {
                route.push("/job-details");
              }}
              rounded
            />
          </div>
        </div>
      ))}
    </div>
  );
}
