"use client";
import {
  dropDownIcon,
  heartIcon,
  profilePicture,
  sample1,
  sample2,
  sample3,
  sample4,
  sendIcon,
} from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import GoBack from "@/shared/GoBack";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function TextBox({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-[1.6rem] text-astraTextGrey">{title}</p>
      <p className="text-[1.8rem] text-black">{text}</p>
    </div>
  );
}

export default function JobInfo() {
  const route = useRouter();
  return (
    <div className="px-[10rem] py-[5rem]">
      <GoBack link="/dashboard" />
      <div className="flex gap-x-[4rem] mt-[6rem]">
        <div>
          <p className="text-[2.5rem] mb-[2rem]">AstroWRLD Summer II</p>
          <p className="text-[1.8rem] mb-[6rem] text-astraTextGrey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex gap-x-[10rem] mb-[4rem]">
            <TextBox title="Name of Ouffit" text="AstroWRLD  Summer II" />
            <TextBox
              title="AI Prompt"
              text=" Female model wearing multi-coloured jumpsuit"
            />
          </div>
          <div className="flex gap-x-[6rem]">
            <TextBox
              title="How many pieces are in this look?"
              text="3 Pieces"
            />
            <TextBox title="Piece 1" text="Jeans - 10 Pieces" />
            <TextBox title="Piece 2" text="Shirts - 20 Pieces" />
            <TextBox title="Piece 3" text="Shirts - 20 Pieces" />
          </div>
          <div className="flex gap-x-[1.8rem] border border-dashed p-[.8rem] w-[max-content] my-[6rem]">
            {[sample1, sample2, sample3, sample4].map((item, index) => (
              <div key={index} className="w-[20rem] h-[23rem]">
                <Image
                  src={item}
                  alt=""
                  width={500}
                  height={500}
                  style={{ height: "auto", width: "100%" }}
                />
              </div>
            ))}
          </div>
          <div className="border rounded-[2rem]">
            <div className="flex justify-between px-[3rem] py-[2rem] border-b">
              <p className="text-[1.6rem]">Set Payment Terms</p>
              <div>
                <Image src={dropDownIcon} alt="" width={22} height={22} />
              </div>
            </div>

            <div className="flex items-center justify-between p-[3rem]">
              <div>
                <p className="text-[1.6rem] mb-[1rem]">
                  How much would you like to charge for this job?
                </p>
                <p className="text-[1.6rem] text-astraTextGrey">
                  Total amount the client will see on your proposal
                </p>
              </div>
              <div className="border rounded-full flex items-center justify-between px-[2.5rem] py-[1.5rem] w-[30rem]">
                <div>
                  <input className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack" />
                </div>

                <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                  $ 0.00
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-[3rem]">
              <div>
                <p className="text-[1.6rem] mb-[1rem]">
                  What is your minimum amount for negotiation?
                </p>
                <p className="text-[1.6rem] text-astraTextGrey">
                  Give the client the minimum amount you can accept for this
                  job.
                </p>
              </div>
              <div className="border rounded-full flex items-center justify-between px-[2.5rem] py-[1.5rem] w-[30rem]">
                <div>
                  <input className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack" />
                </div>

                <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                  $ 0.00
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-[2rem] p-[3rem] h-[max-content]">
          <p className="text-[1.5rem] mb-[3rem]">About the Client</p>
          <div className="mb-[2rem]">
            <Image
              src={profilePicture}
              alt="logo"
              height={58}
              width={58}
              className="rounded-full"
            />
          </div>
          <p className="text-[1.5rem]">Micheal Dior St. Vuitton</p>
          <p className="text-[1.5rem] my-[3rem] text-astraTextGrey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. uis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="mb-[2rem]">
            <p className="text-[1.5rem] mb-[.5rem]">Date posted:</p>
            <p className="text-[1.5rem] text-astraTextGrey">
              03 December, 2024
            </p>
          </div>
          <div className="mb-[3rem]">
            <p className="text-[1.5rem] mb-[.5rem]">Proposed due date</p>
            <p className="text-[1.5rem] text-astraTextGrey">
              31 December, 2024
            </p>
          </div>
          <ButtonWithIcon
            action="Send Application"
            handleClick={() => {
              route.push("/application");
            }}
            loaderColor="#ffffff"
            icon={sendIcon}
            containerStyle="bg-black rounded-full w-[100%] py-[1.2rem]"
            fontStyle="text-white text-[1.5rem]"
            iconWidth="w-[2.4rem]"
          />
          <ButtonWithIcon
            action="Save Job"
            handleClick={() => {}}
            loaderColor="#ffffff"
            icon={heartIcon}
            containerStyle="bg-transparent rounded-full w-[100%] py-[1.2rem] border border-black mt-[2rem]"
            fontStyle="text-black text-[1.5rem]"
            iconWidth="w-[2.4rem]"
          />
        </div>
      </div>
    </div>
  );
}
