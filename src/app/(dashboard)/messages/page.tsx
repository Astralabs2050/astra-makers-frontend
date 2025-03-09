"use client";

import DashboardFrame from "@/shared/DashboardFrame";
import dynamic from "next/dynamic";
const MessageFrame = dynamic(
  () => import("@/components/messages/MessageFrame"),
  {
    ssr: false,
  }
);

export default function Messages() {
  return (
    <DashboardFrame withSideBar>
      <MessageFrame />
    </DashboardFrame>
  );
}
