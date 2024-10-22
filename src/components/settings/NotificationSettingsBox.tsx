"use client";
import { settingsBack } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotificationSettingsBox() {
  const route = useRouter();

  return (
    <div className="w-[100%]">
      <div className="flex justify-between items-center py-[3rem] pl-[3rem] pr-[8rem] border-b">
        <div
          className="flex items-center gap-x-[3rem] cursor-pointer"
          onClick={() => route.push("/settings")}
        >
          <div>
            <Image src={settingsBack} alt="" height={24} width={24} />
          </div>
          <p className="text-[3rem] font-bold">Notifications</p>
        </div>
        <Button
          action="Back to dashboard"
          width="w-[20rem]"
          handleClick={() => {
            route.push("/dashboard");
          }}
          fontSize="text-[1.3rem] font-bold"
          inverse
          rounded
        />
      </div>
      <div className="px-[3rem] py-[2rem]">
        <div className="pb-[3rem] border-b">
          <p className="text-[2rem] font-bold">Basic Information</p>
          <p className="text-[1.6rem]">
            This is notifications preferences that you can update anytime.
          </p>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <div className="w-[25%]">
            <p className="text-[1.8rem] font-bold">Notifications</p>
            <p className="text-[1.6rem]">
              Customize your preferred notification settings
            </p>
          </div>
          <div className="">
            <div className="mb-[2rem]">
              <label className="text-[1.8rem] font-bold">
                <input
                  type="checkbox"
                  value="digital"
                  checked={false}
                  className="mr-[2rem] w-6 h-6 appearance-none border-2 border-gray-300  checked:bg-[#4640DE] checked:border-transparent"
                />
                Applications
              </label>
              <p className="text-[1.8rem] ml-[4rem]">
                These are notifications for jobs that you have applied to
              </p>
            </div>
            <div className="mb-[2rem]">
              <label className="text-[1.8rem] font-bold">
                <input
                  type="checkbox"
                  value="digital"
                  checked={false}
                  className="mr-[2rem] w-6 h-6 appearance-none border-2 border-gray-300  checked:bg-[#4640DE] checked:border-transparent"
                />
                Jobs
              </label>
              <p className="text-[1.8rem] ml-[4rem]">
                These are notifications for job openings that suit your profile
              </p>
            </div>
            <div className="mb-[2rem]">
              <label className="text-[1.8rem] font-bold">
                <input
                  type="checkbox"
                  value="digital"
                  checked={false}
                  className="mr-[2rem] w-6 h-6 appearance-none border-2 border-gray-300  checked:bg-[#4640DE] checked:border-transparent"
                />
                Recommendations
              </label>
              <p className="text-[1.8rem] ml-[4rem]">
                These are notifications for personalized recommendations from
                our recruiters
              </p>
            </div>
            <Button
              action="Update preferences"
              width="w-[22rem]"
              handleClick={() => {
                route.push("");
              }}
              fontSize="text-[1.5rem]"
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}
