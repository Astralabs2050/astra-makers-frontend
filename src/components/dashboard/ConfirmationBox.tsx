"use client";

import { modalImage } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JobConfirmationBox() {
  const route = useRouter();
  return (
    <div className="p-[2.5rem] w-[47rem] bg-white rounded-[1rem]">
      <div>
        <Image src={modalImage} alt="" width={450} height={220} />
      </div>
      <p className="text-[2rem] mt-[3rem] font-bold">
        Your Application has been successfully sent to the Job Creator!
      </p>
      <p className="mb-[3rem] mt-[1rem] text-[1.6rem]">
        You will be notified when the brand has made a decision on your
        application.
      </p>
      <Button
        action="Go to Dashboard"
        width="w-[100%]"
        handleClick={() => {
          route.push("/dashboard");
        }}
        fontSize="text-[1.5rem] font-[500]"
        rounded
      />
    </div>
  );
}
