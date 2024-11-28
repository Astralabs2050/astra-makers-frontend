"use client";
import { dropDownIcon, heartIcon, profilePicture, sendIcon } from "@/image";
import { Query } from "@/network/constant";
import { getSingleJob } from "@/network/dashboard";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import GoBack from "@/shared/GoBack";
import LoaderSvg from "@/shared/LoaderSvg";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function TextBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="min-w-[30rem]">
      <p className="text-[1.6rem] text-astraTextGrey">{title}</p>
      <p className="text-[1.8rem] text-black">{text}</p>
    </div>
  );
}

export default function JobInfo() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isPending } = useQuery({
    queryFn: () => getSingleJob(id ?? ""),
    queryKey: [Query.GET_SINGLE_JOB_QUERY],
  });
  const singleJob =
    data && data.status === true && !("error" in data) ? data.data : null;

  const applyForm = useFormik<{ price: number; minimumPrice: number }>({
    initialValues: {
      price: 0,
      minimumPrice: 0,
    },
    validationSchema: Yup.object({
      price: Yup.number()
        .required("Please enter your price")
        .min(1, "Please enter your price"),
      minimumPrice: Yup.number(),
      // .required("Please enter your minimum price")
      // .min(1, "Please enter your minimum price"),
    }),
    validateOnMount: true,
    onSubmit: () => {},
  });

  const handleSubmit = () => {
    if (!applyForm.isValid) {
      toast.error("Please enter ammount and minimum amount");
      console.log("Please enter ammount and minimum amount");
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "pricing",
          JSON.stringify({
            amount: applyForm.values.price,
            minAmount: applyForm.values.minimumPrice,
          })
        );
      }
      route.push(`/application?id=${id}`);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAmount = localStorage.getItem("pricing");
      if (storedAmount) {
        const parsedAmount = JSON.parse(storedAmount);
        applyForm.setFieldValue("price", parsedAmount.amount);
        applyForm.setFieldValue("minimumPrice", parsedAmount.minAmount);
      }
    }
  }, []);

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-[4rem] w-[100%]">
        <LoaderSvg color="#0000000" />
      </div>
    );
  }
  return (
    <div className="px-[10rem] py-[5rem]">
      <GoBack link="/dashboard" />
      {singleJob && (
        <div className="flex gap-x-[4rem] mt-[6rem] max-w-[50vw]">
          <div>
            <p className="text-[2.5rem] mb-[2rem]">
              {singleJob?.design?.outfitName}
            </p>
            <p className="text-[1.8rem] mb-[6rem] text-astraTextGrey">
              {singleJob?.description}
            </p>
            <div className="flex gap-x-[10rem] mb-[4rem]">
              <TextBox
                title="Name of Ouffit"
                text={singleJob?.design?.outfitName}
              />
              <TextBox title="AI Prompt" text={singleJob?.design?.prompt} />
            </div>
            <div className="flex gap-x-[10rem]">
              <TextBox
                title="How many pieces are in this look?"
                text={`${singleJob?.design?.pieceNumber} Piece${
                  singleJob?.design?.pieceNumber > 1 ? "s" : ""
                }`}
              />
              <div className="flex flex-wrap gap-[1.6rem]">
                {singleJob?.design?.pieces?.map((item, index) => (
                  <TextBox
                    key={item.id}
                    title={`Piece ${index + 1}`}
                    text={`${item.pieceType} - ${item.designNumber} Piece${
                      item.designNumber > 1 ? "s" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-[1.8rem] flex-wrap border border-dashed p-[.8rem] min-w-[89rem] my-[6rem]">
              {singleJob?.design?.media?.map((item, index) => (
                <div
                  key={index}
                  className="w-[20rem] h-[25rem] overflow-hidden flex items-center justify-center bg-gray-100"
                >
                  <Image
                    src={item.link}
                    alt=""
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
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
                    <input
                      className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack"
                      value={applyForm.values.price}
                      onChange={applyForm.handleChange}
                      onBlur={applyForm.handleBlur}
                      name="price"
                    />
                  </div>
                  <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                    $ {applyForm.values.price}
                  </p>
                </div>
              </div>
              {/* <div className="flex items-center justify-between p-[3rem]">
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
                    <input
                      className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack"
                      value={applyForm.values.minimumPrice}
                      onChange={applyForm.handleChange}
                      onBlur={applyForm.handleBlur}
                      name="minimumPrice"
                    />
                  </div>

                  <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                    $ {applyForm.values.minimumPrice}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="border rounded-[2rem] p-[3rem] h-[max-content] min-w-[25vw]">
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
            <p className="text-[1.5rem]">{singleJob?.user?.brand?.username}</p>
            <p className="text-[1.5rem] my-[3rem] text-astraTextGrey">
              {`${singleJob?.user?.brand?.username} is one of our creators on the
              platform. Please read through the job description and enter a price before applying.`}
            </p>
            <div className="mb-[2rem]">
              <p className="text-[1.5rem] mb-[.5rem]">Date posted:</p>
              <p className="text-[1.5rem] text-astraTextGrey">
                {dayjs(singleJob?.createdAt).format("DD MMMM, YYYY")}
              </p>
            </div>
            <div className="mb-[3rem]">
              <p className="text-[1.5rem] mb-[.5rem]">Proposed due date</p>
              <p className="text-[1.5rem] text-astraTextGrey">
                {dayjs(singleJob?.timeline).format("DD MMMM, YYYY")}
              </p>
            </div>
            <ButtonWithIcon
              action="Send Application"
              handleClick={handleSubmit}
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
      )}
    </div>
  );
}
