"use client";

import { digitalCreator, physicalMaker } from "@/image";
import OnboardFrame from "@/shared/OnboardFrame";
import Image from "next/image";
import Link from "next/link";

export default function SelectCategory() {
  return (
    <OnboardFrame link="/verification" pageNumber={1}>
      <p className="text-[2.4rem] font-bold text-center mt-[3rem]">
        Hello, John Doe
      </p>
      <p className="text-[3rem] text-center mb-[5rem]">
        What will you be joining Astra as?
      </p>
      <div className="flex justify-center gap-x-[2rem]">
        <Link href={`/about?category=digital`} passHref>
          <div className="border border-astraBorderGrey rounded-[1rem] w-[30rem] h-[30rem] p-[4rem] flex flex-col items-center cursor-pointer">
            <div>
              <Image src={digitalCreator} alt="logo" height={80} width={80} />
            </div>
            <p className="text-[2rem] font-bold text-center mt-[2rem] mb-[1rem]">
              Digital Creator
            </p>
            <p className="text-[1.6rem] text-center">
              Are you a Clothe 3D Artist, Fashion designer, Developer e.t.c.?
            </p>
          </div>
        </Link>
        <Link href={`/about?category=physical`} passHref>
          <div className="border border-astraBorderGrey rounded-[1rem] w-[30rem] h-[30rem] p-[4rem] flex flex-col items-center">
            <div>
              <Image src={physicalMaker} alt="logo" height={80} width={80} />
            </div>
            <p className="text-[2rem] font-bold text-center mt-[2rem] mb-[1rem]">
              Physical Maker
            </p>
            <p className="text-[1.6rem] text-center">
              Are you a Tailor, Fashion Designer and you can bring digital
              outfits to reality?
            </p>
          </div>
        </Link>
      </div>
    </OnboardFrame>
  );
}
