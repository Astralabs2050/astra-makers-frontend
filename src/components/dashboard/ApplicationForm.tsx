"use client";

import {
  logo,
  portfolioSample1,
  portfolioSample2,
  webIcon,
  workSelected,
} from "@/image";
import Button from "@/shared/Button";
import GoBack from "@/shared/GoBack";
import Image from "next/image";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
  const route = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      title: "Astronaut 3D Rendering",
      images: [portfolioSample1, portfolioSample2],
      isSelected: false,
    },
    {
      title: "Astronaut 3D Rendering",
      images: [portfolioSample1, portfolioSample2],
      isSelected: false,
    },
  ]);

  const handleSelect = (index: number) => {
    const updatedItems = portfolioItems.map((item, i) =>
      i === index ? { ...item, isSelected: !item.isSelected } : item
    );
    setPortfolioItems(updatedItems);
  };
  return (
    <div>
      <div className="px-[5rem] pt-[3rem] pb-[4rem]">
        <Image src={logo} alt="logo" height={30} width={150} />
      </div>
      <div className="bg-white w-[70%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
        <div className="flex justify-between items-start ">
          <GoBack link="/job-details" />{" "}
          <p className="text-[3rem] font-bold">Send Application</p>
          <div className="w-[8rem]"></div>
        </div>
        <div className="mt-[5rem]">
          <p className="text-center text-[1.8rem]">
            Select project(s) to share with creator
          </p>
          <div className="mt-[2rem]">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.isSelected ? "border-black" : "border-astraBorderGrey"
                } p-[2rem] w-[50rem] mx-auto  rounded-[1rem] mb-[2rem] border`}
                onClick={() => handleSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[1.8rem]">{item.title}</p>
                  {item.isSelected && (
                    <div>
                      <Image src={workSelected} alt="" width={24} height={24} />
                    </div>
                  )}
                </div>
                <hr className="my-[1.4rem]" />
                <div className="flex flex-wrap">
                  {item.images.map((pix, index) => (
                    <div key={index} className="w-[48%]  mx-auto">
                      <Image
                        src={pix}
                        alt=""
                        width={200}
                        height={200}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[55%] mx-auto">
            <p className="mb-[1rem] text-[1.8rem]">Portfolio link</p>
            <div className="border rounded-[.5rem] flex items-center gap-x-[2rem] px-[2.5rem] py-[1.5rem] w-[100%]">
              <Image src={webIcon} alt="" width={24} height={24} />
              <div>
                <input className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack" />
              </div>
            </div>
          </div>
        </div>
        <Button
          action="Send Application"
          width="w-[48rem] mt-[3rem] mb-[2rem] mx-auto"
          handleClick={() => {
            setModal(true);
          }}
          fontSize="text-[1.6rem]"
        />
      </div>
      <ConfirmationModal
        isVisible={modal}
        isLoading={false}
        handleCancel={() => {
          setModal(false);
        }}
        handleProceed={() => {
          route.push("/job-confirmation");
        }}
      />
    </div>
  );
}
