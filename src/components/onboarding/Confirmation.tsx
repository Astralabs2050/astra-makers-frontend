"use client";
import { modalImage } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ConfirmationBox() {
  const route = useRouter();
  return (
    <div className="p-[2.5rem] w-[47rem] bg-white rounded-[1rem]">
      <div>
        <Image src={modalImage} alt="" width={450} height={220} />
      </div>
      <p className="text-[2rem] mt-[3rem] font-bold">
        Welcome to ASTRA Creators!
      </p>
      <p className="mb-[3rem] mt-[1rem] text-[1.6rem]">
        Your application is currently under review, you would receive a
        confirmation message soon.{" "}
      </p>
      <div className="flex justify-between items-center">
        <Button
          action="Skip for now"
          width="w-[48%]"
          handleClick={() => {
            route.push("/dashboard");
          }}
          fontSize="text-[1.3rem] font-bold"
          inverse
          rounded
        />
        <Button
          action="Setup Payment details"
          width="w-[48%]"
          handleClick={() => {
            route.push("/escrow");
          }}
          fontSize="text-[1.3rem] font-bold"
          rounded
        />
      </div>
    </div>
  );
}
