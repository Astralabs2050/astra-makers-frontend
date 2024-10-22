"use client";

import {
  availableIcon,
  completedIcon,
  earningsIcon,
  invoiceIcon,
  trendingUp,
} from "@/image";
import Image from "next/image";

export function ChartBox({
  icon,
  title,
  digit,
  updatedWhen,
  chartPresent,
  chartValue,
  money,
}: {
  icon: string;
  title: string;
  digit: number;
  updatedWhen: string;
  chartPresent?: boolean;
  money?: boolean;
  chartValue?: number;
}) {
  return (
    <div className="w-[22rem] h-[20rem] addshadow bg-white p-[2.3rem] rounded-[1.4rem]">
      <div>
        <Image src={icon} alt="" height={38} width={38} />
      </div>
      <p className="text-astraTextGrey text-[1.7rem] mt-[1.2rem]">{title}</p>
      <p className="text-[2.3rem] mt-[1rem] mb-[.6rem] font-bold">{`${
        money ? "$" : ""
      }${digit.toLocaleString()}`}</p>
      {chartPresent ? (
        <div className="flex items-center">
          <div className="mr-[.5rem]">
            <Image src={trendingUp} alt="" height={16} width={16} />
          </div>
          <p className="text-astraGreen text-[1.3rem]">+{chartValue}%</p>
          <div className="bg-astraTextGrey rounded-full w-[3.8px] h-[3.8px] mx-[1.1rem]"></div>
          <p className="text-[1.3rem] text-astraTextGrey">{updatedWhen}</p>
        </div>
      ) : (
        <p className="text-[1.3rem] text-astraTextGrey">
          Updated {updatedWhen}
        </p>
      )}
    </div>
  );
}

export default function EarningBox() {
  return (
    <div className="px-[10rem] py-[5rem] w-[100%]">
      <div>
        <p className="text-[3rem] font-bold">Your Earnings 💰</p>
        <p className="text-[2rem] ">Here you can view your earnings</p>
      </div>
      <div className="flex gap-[2rem] mt-[4rem] mb-[6rem]">
        <ChartBox
          icon={earningsIcon}
          title="Total Earnings"
          digit={432215.32}
          updatedWhen="May 17, 2022"
          chartPresent={true}
          chartValue={2.4}
          money
        />{" "}
        <ChartBox
          icon={earningsIcon}
          title="Pending"
          digit={4215.32}
          updatedWhen="May 17, 2022"
          money
        />{" "}
        <ChartBox
          icon={availableIcon}
          title="Available"
          digit={2215.32}
          updatedWhen="May 17, 2022"
          money
        />{" "}
        <ChartBox
          icon={completedIcon}
          title="Total Jobs Completed"
          digit={10}
          updatedWhen="May 17, 2022"
        />
      </div>
      <p className="text-[2.5rem] font-bold mb-[3rem]">Recent Activities</p>
      <div className="border rounded-[1rem] w-[max-content]">
        <div className="flex items-center px-[3rem] py-[1.6rem]">
          <p className="text-astraTextGrey font-bold text-[1.4rem] pr-[1rem] min-w-[15rem]">
            Timestamp
          </p>
          <p className="text-astraTextGrey font-bold text-[1.4rem] pr-[1rem] min-w-[20rem]">
            Description
          </p>
          <p className="text-astraTextGrey font-bold text-[1.4rem] pr-[1rem] min-w-[14rem]">
            Brand Name
          </p>
          <p className="text-astraTextGrey font-bold text-[1.4rem] pr-[1rem] min-w-[12rem]">
            Status
          </p>
          <p className="text-astraTextGrey font-bold text-[1.4rem] pr-[1rem] min-w-[13rem]">
            Amount
          </p>
          <p className="text-astraTextGrey font-bold text-[1.4rem]">
            Payment Status
          </p>
        </div>

        {[
          {
            timeStamp: "May 17, 2022 10:00",
            description: "Turn Fashion Images to 3D",
            brandName: "AI Fashion",
            status: "Pending",
            amount: 100,
            paymentStatus: "Paid",
          },
          {
            timeStamp: "May 17, 2022 10:00",
            description: "Turn Fashion Images to 3D",
            brandName: "AI Fashion",
            status: "Pending",
            amount: 100,
            paymentStatus: "",
          },
          {
            timeStamp: "May 17, 2022 10:00",
            description: "Turn Fashion Images to 3D",
            brandName: "AI Fashion",
            status: "Completed",
            amount: 100,
            paymentStatus: "Paid",
          },
          {
            timeStamp: "May 17, 2022 10:00",
            description: "Turn Fashion Images to 3D",
            brandName: "AI Fashion",
            status: "Pending",
            amount: 100,
            paymentStatus: "",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center px-[3rem] pt-[2.8rem] pb-[1.5rem] border-t"
          >
            <p className="text-[1.4rem] pr-[1rem] min-w-[15rem] text-black">
              {item.timeStamp}
            </p>
            <p className="text-[1.4rem] pr-[1rem] min-w-[20rem] text-black">
              {item.description}
            </p>
            <p className="text-[1.4rem] pr-[1rem] min-w-[14rem] text-black">
              {item.brandName}
            </p>
            <p
              className={`text-[1.4rem] pr-[1rem] min-w-[12rem] ${
                item.status === "Pending" && "text-astraRed"
              } ${item.status === "Completed" && "text-astraGreen"}`}
            >
              {item.status}
            </p>
            <p className="text-[1.4rem] pr-[1rem] min-w-[13rem] text-black">
              ${item.amount}
            </p>
            <p
              className={`text-[1.4rem] min-w-[4rem] mr-[3rem] ${
                item.paymentStatus === "Paid" ? "text-astraGreen" : "text-black"
              }`}
            >
              {item.paymentStatus === "Paid" ? "Paid" : "-"}
            </p>
            <div className="flex items-center gap-x-[.8rem] cursor-pointer">
              <div>
                <Image src={invoiceIcon} alt="" height={18} width={18} />
              </div>
              <p className="text-[1.4rem] text-astraBlue underline">Invoice</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
