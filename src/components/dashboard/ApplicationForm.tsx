"use client";

import { logo, workSelected } from "@/image";
import Button from "@/shared/Button";
import GoBack from "@/shared/GoBack";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applyToJob, getUserProjects } from "@/network/dashboard";
import { Query } from "@/network/constant";
import LoaderSvg from "@/shared/LoaderSvg";
import toast from "react-hot-toast/headless";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ApplicationForm() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [modal, setModal] = useState<boolean>(false);
  const [portfolioItems, setPortfolioItems] = useState<string[]>([]);

  const applyForm = useFormik<{ amount: number; walletAddress: string }>({
    initialValues: {
      amount: 0,
      walletAddress: "",
    },
    validationSchema: Yup.object({}),
    validateOnMount: true,
    onSubmit: async () => {},
  });

  const { data, isPending } = useQuery({
    queryFn: getUserProjects,
    queryKey: [Query.GET_USER_PROJECTS_QUERY],
  });

  const projects =
    data && data.status === true && !("error" in data) ? data.data : null;

  const handleSelect = (id: string) => {
    setPortfolioItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const { mutateAsync, isPending: isPendingApply } = useMutation({
    mutationFn: applyToJob,
  });
  const handleApply = async () => {
    const res = await mutateAsync({
      jobId: id ?? "",
      amount: applyForm?.values?.amount,
      wallet: applyForm?.values?.walletAddress,
      projectIds: portfolioItems,
    });
    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else if (res && res.data) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("pricing");
      }
      toast.success(res.message);
      route.push("/job-confirmation");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAmount = localStorage.getItem("pricing");
      if (storedAmount) {
        const parsedAmount = JSON.parse(storedAmount);
        applyForm.setFieldValue("amount", parsedAmount.amount);
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
    <div>
      <div className="px-[5rem] pt-[3rem] pb-[4rem]">
        <Image src={logo} alt="logo" height={30} width={150} />
      </div>
      <div className="bg-white w-[70%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
        <div className="flex justify-between items-start ">
          <GoBack link={`/job-details?id=${id}`} />{" "}
          <p className="text-[3rem] font-bold">Send Application</p>
          <div className="w-[8rem]"></div>
        </div>
        <div className="mt-[5rem]">
          <p className="text-center text-[1.8rem]">
            Select project(s) to share with creator
          </p>
          <div className="mt-[2rem]">
            {projects &&
              projects.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    item.id ? "border-black" : "border-astraBorderGrey"
                  } p-[2rem] w-[50rem] mx-auto  rounded-[1rem] mb-[2rem] border`}
                  onClick={() => handleSelect(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[1.8rem]">{item.title}</p>
                    {portfolioItems.includes(item.id) && (
                      <div>
                        <Image
                          src={workSelected}
                          alt=""
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </div>
                  <hr className="my-[1.4rem]" />
                  <div className="flex flex-wrap">
                    {item?.media?.map((pix, index) => (
                      <div key={index} className="w-[48%]  mx-auto">
                        <Image
                          src={pix?.link}
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
            <p className="mb-[1rem] text-[1.8rem]">Wallet Address</p>
            <div className="border rounded-[.5rem] flex items-center gap-x-[2rem] px-[2.5rem] py-[1.5rem] w-[100%]">
              {/* <Image src={webIcon} alt="" width={24} height={24} /> */}
              <div className="w-[100%]">
                <input
                  name="walletAddress"
                  value={applyForm.values.walletAddress}
                  onChange={applyForm.handleChange}
                  className="bg-transparent outline-none text-[1.6rem] text-astraLightBlack w-[100%]"
                />
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
        isLoading={isPendingApply}
        handleCancel={() => {
          setModal(false);
        }}
        handleProceed={handleApply}
      />
    </div>
  );
}
