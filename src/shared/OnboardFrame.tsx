"use client";
import { arrowLeft, logo, tick } from "@/image";
import Image from "next/image";
import Link from "next/link";
interface OnboardFrameProps {
  link: string;
  pageNumber: number;
  children: React.ReactNode;
}

export default function OnboardFrame({
  link,
  pageNumber,
  children,
}: OnboardFrameProps) {
  return (
    <div>
      <div className="px-[5rem] pt-[3rem] pb-[4rem]">
        <Image src={logo} alt="logo" height={30} width={150} />
      </div>
      <div className="bg-white w-[70%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
        <div className="flex justify-between items-start">
          <Link href={link} passHref>
            <div className="flex gap-x-[1rem]">
              <Image src={arrowLeft} alt="" height={24} width={24} />
              <p className="text-[1.6rem] font-[500]">Go Back</p>
            </div>
          </Link>
          <div className="flex items-center">
            <div
              className={`${
                pageNumber > 0
                  ? "bg-astraBlue text-white"
                  : "text-astraLightBlack border border-astraSilver"
              } text-[1.8rem] flex items-center justify-center rounded-full w-[4rem] h-[4rem]`}
            >
              {pageNumber > 1 ? (
                <Image src={tick} alt="" height={24} width={24} />
              ) : (
                1
              )}
            </div>
            <div className="w-[6rem] border"></div>
            <div
              className={`${
                pageNumber > 1
                  ? "bg-astraBlue text-white"
                  : "text-astraLightBlack border border-astraSilver"
              } text-[1.8rem] flex items-center justify-center rounded-full w-[4rem] h-[4rem]`}
            >
              {pageNumber > 2 ? (
                <Image src={tick} alt="" height={24} width={24} />
              ) : (
                2
              )}
            </div>
            <div className="w-[6rem] border"></div>
            <div
              className={`${
                pageNumber > 2
                  ? "bg-astraBlue text-white"
                  : "text-astraLightBlack border border-astraSilver"
              } text-[1.8rem] flex items-center justify-center rounded-full w-[4rem] h-[4rem]`}
            >
              {pageNumber > 3 ? (
                <Image src={tick} alt="" height={24} width={24} />
              ) : (
                3
              )}
            </div>
            <div className="w-[6rem] border"></div>
            <div
              className={`${
                pageNumber > 3
                  ? "bg-astraBlue text-white"
                  : "text-astraLightBlack border border-astraSilver"
              } text-[1.8rem] flex items-center justify-center rounded-full w-[4rem] h-[4rem]`}
            >
              {pageNumber > 4 ? (
                <Image src={tick} alt="" height={24} width={24} />
              ) : (
                4
              )}
            </div>
          </div>
          <div className="w-[8rem]"></div>
        </div>
        <div className="mx-auto">{children}</div>
      </div>
    </div>
  );
}
