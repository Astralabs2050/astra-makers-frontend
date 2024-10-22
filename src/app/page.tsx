"use client";

import Login from "@/components/auth/Login";
import AuthRight from "@/shared/AuthRight";

export default function Home() {
  return (
    <div className="flex bg-white">
      <div className="flex justify-center items-center w-[55%]">
        <Login />
      </div>
      <div className="w-[45%]">
        <AuthRight />
      </div>
    </div>
  );
}
