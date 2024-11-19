"use client";

import {
  activeDashboardIcon,
  activeEarningIcon,
  activeMessageIcon,
  activeOngoingJobsIcon,
  activeSettingsIcon,
  astraCoin,
  dashboardIcon,
  earningIcon,
  helpAndSupportIcon,
  logo,
  messageIcon,
  minimizeIcon,
  notificationIcon,
  ongoingJobsIcon,
  profilePicture,
  settingsIcon,
} from "@/image";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardFrameProps {
  children: React.ReactNode;
  withSideBar?: boolean;
}

export default function DashboardFrame({
  children,
  withSideBar,
}: DashboardFrameProps) {
  const route = useRouter();
  const pathname = usePathname();
  const [minimize, setMinimize] = useState<boolean>(false);
  return (
    <div className="w-[100vw] overflow-x-hidden">
      <div className="flex justify-between items-center py-[1.2rem] pr-[10rem] pl-[5rem] border-b">
        <div>
          <Image src={logo} alt="logo" height={30} width={150} />
        </div>
        <div className="flex items-center gap-x-[3rem]">
          <div className="flex items-center px-[3rem] py-[.8rem] rounded-full gap-x-[.8rem] bg-astraBorderGrey">
            <div>
              <Image src={astraCoin} alt="logo" height={30} width={30} />
            </div>
            <p className="text-[1.8rem]">
              0.00 <span className="text-[1.8rem] font-[500]">ASTRAS</span>
            </p>
          </div>
          <div>
            <Image src={notificationIcon} alt="logo" height={25} width={25} />
          </div>
          <div>
            <Image
              src={profilePicture}
              alt="logo"
              height={58}
              width={58}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        {withSideBar && (
          <div className="px-[1.6rem] pt-[2rem] pb-[5rem] border-r w-[max-content]">
            <Image
              src={minimizeIcon}
              alt="logo"
              height={24}
              width={24}
              onClick={() => {
                setMinimize((prev) => !prev);
              }}
              className={`cursor-pointer transition-all duration-200 ease-in ${
                minimize && "rotate-180"
              }`}
            />
            <div className="mt-[1.5rem]">
              {[
                {
                  name: "Dashboard",
                  icon: dashboardIcon,
                  activeIcon: activeDashboardIcon,
                  url: "/dashboard",
                  active: pathname === "/dashboard",
                },
                {
                  name: "Ongoing Jobs",
                  icon: ongoingJobsIcon,
                  activeIcon: activeOngoingJobsIcon,
                  url: "/ongoing-jobs",
                  active: pathname === "/ongoing-jobs",
                },
                {
                  name: "Earnings",
                  icon: earningIcon,
                  activeIcon: activeEarningIcon,
                  url: "/earnings",
                  active: pathname === "/earnings",
                },
                {
                  name: "Messages",
                  icon: messageIcon,
                  activeIcon: activeMessageIcon,
                  url: "/messages",
                  active: pathname === "/messages",
                },
                {
                  name: "Settings",
                  icon: settingsIcon,
                  activeIcon: activeSettingsIcon,
                  url: "/settings",
                  active:
                    pathname === "/settings" ||
                    pathname === "/profile-settings" ||
                    pathname === "/security-settings" ||
                    pathname === "/notification-settings",
                },
                {
                  name: "Help & Support",
                  icon: helpAndSupportIcon,
                  activeIcon: "",
                  url: "/support",
                  active: pathname === "/support",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-x-[2rem]  ${
                    minimize ? "w-[6rem]  pl-[2rem]" : "w-[24.8rem] pl-[2.5rem]"
                  }  py-[1.8rem] cursor-pointer mb-[1.5rem] ${
                    item.active ? "bg-black rounded-[1rem]" : ""
                  } ${index === 5 && "mt-[10rem]"} `}
                  onClick={() => route.push(item.url)}
                >
                  <div>
                    <Image
                      src={item.active ? item.activeIcon : item.icon}
                      alt="logo"
                      height={20}
                      width={20}
                    />
                  </div>
                  {minimize || (
                    <p
                      className={`text-[1.6rem] ${
                        item.active ? "text-white" : "text-astraTextGrey"
                      }`}
                    >
                      {item.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
