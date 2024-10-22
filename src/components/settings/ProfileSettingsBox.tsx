"use client";

import { profilePicture, settingsBack, settingsUpload } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileSetttingsBox() {
  const route = useRouter();
  const settingsForm = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      role: "digital",
    },
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: () => {},
  });
  return (
    <div className="w-[100%]">
      <div className="flex justify-between items-center py-[3rem] pl-[3rem] pr-[8rem] border-b">
        <div
          className="flex items-center gap-x-[3rem] cursor-pointer"
          onClick={() => route.push("/settings")}
        >
          <div>
            <Image src={settingsBack} alt="" height={24} width={24} />
          </div>
          <p className="text-[3rem] font-bold">Profile Settings</p>
        </div>
        <Button
          action="Back to dashboard"
          width="w-[20rem]"
          handleClick={() => {
            route.push("/dashboard");
          }}
          fontSize="text-[1.3rem] font-bold"
          inverse
          rounded
        />
      </div>
      <div className="px-[3rem] py-[2rem]">
        <div className="pb-[3rem] border-b">
          <p className="text-[2rem] font-bold">Basic Information</p>
          <p className="text-[1.6rem]">
            This is your personal information that you can update anytime.
          </p>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <div className="w-[25%]">
            <p className="text-[1.8rem] font-bold">Profile Photo</p>
            <p className="text-[1.6rem]">
              This image will be shown publicly as your profile picture, it will
              help recruiters recognize you!
            </p>
          </div>
          <div className="flex gap-x-[3rem]">
            <div>
              <Image
                src={profilePicture}
                alt="logo"
                height={120}
                width={120}
                className="rounded-full"
              />
            </div>
            <div>
              <Image
                src={settingsUpload}
                alt="logo"
                height={100}
                width={300}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <p className="text-[1.8rem] font-bold w-[25%]">Personal Details</p>
          <div className="w-[50rem]">
            <div className="w-[100%]">
              <p className="text-[1.6rem]  mb-[.7rem] ">
                Full Name <span className="text-[1.4rem] text-astraRed">*</span>
              </p>
              <InputField
                name="fullName"
                onChange={settingsForm.handleChange}
                onBlur={settingsForm.handleBlur}
                error={null}
                value={settingsForm.values.fullName}
                type="text"
                borderRadius="rounded-none"
                fontSize="text-[1.5rem]"
                marginBottom="mb-[2rem]"
              />
            </div>
            <div className="flex w-[100%] justify-between">
              <div className="w-[48%]">
                <p className="text-[1.6rem]  mb-[.7rem] ">
                  Phone Number
                  <span className="text-[1.4rem] text-astraRed">*</span>
                </p>
                <InputField
                  name="phone"
                  onChange={settingsForm.handleChange}
                  onBlur={settingsForm.handleBlur}
                  error={null}
                  value={settingsForm.values.phone}
                  type="text"
                  borderRadius="rounded-none"
                  fontSize="text-[1.5rem]"
                  marginBottom="mb-[2rem]"
                />
              </div>
              <div className="w-[48%]">
                <p className="text-[1.6rem]  mb-[.7rem] ">
                  Email
                  <span className="text-[1.4rem] text-astraRed">*</span>
                </p>
                <InputField
                  name="email"
                  onChange={settingsForm.handleChange}
                  onBlur={settingsForm.handleBlur}
                  error={null}
                  value={settingsForm.values.email}
                  type="text"
                  borderRadius="rounded-none"
                  fontSize="text-[1.5rem]"
                  marginBottom="mb-[2rem]"
                />
              </div>
            </div>
            <div className="flex w-[100%] justify-between">
              <div className="w-[48%]">
                <p className="text-[1.6rem]  mb-[.7rem] ">
                  Date of Birth
                  <span className="text-[1.4rem] text-astraRed">*</span>
                </p>
                <InputField
                  name="dob"
                  onChange={settingsForm.handleChange}
                  onBlur={settingsForm.handleBlur}
                  error={null}
                  value={settingsForm.values.dob}
                  type="text"
                  borderRadius="rounded-none"
                  fontSize="text-[1.5rem]"
                />
              </div>
              <div className="w-[48%]">
                <p className="text-[1.6rem]  mb-[.7rem] ">
                  Phone Number
                  <span className="text-[1.4rem] text-astraRed">*</span>
                </p>
                <InputField
                  name="phone"
                  onChange={settingsForm.handleChange}
                  onBlur={settingsForm.handleBlur}
                  error={null}
                  value={settingsForm.values.phone}
                  type="text"
                  borderRadius="rounded-none"
                  fontSize="text-[1.5rem]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <div className="w-[25%]">
            <p className="text-[1.8rem] font-bold">Account Type</p>
            <p className="text-[1.6rem]">You can update your account type</p>
          </div>
          <div className="">
            <div className="mb-[2rem]">
              <label className="text-[1.8rem] font-bold">
                <input
                  type="radio"
                  value="digital"
                  checked={settingsForm.values.role === "digital"}
                  onChange={settingsForm.handleChange}
                  className="mr-[2rem] w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:bg-[#4640DE] checked:border-transparent"
                />
                Job Seeker
              </label>

              <p className="text-[1.8rem] ml-[3.5rem]">Looking for a job</p>
            </div>
            <div className="mb-[2rem]">
              <label className="text-[1.8rem] font-bold">
                <input
                  type="radio"
                  value="digital"
                  checked={settingsForm.values.role === "phisical"}
                  onChange={settingsForm.handleChange}
                  className="mr-[2rem] w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:bg-[#4640DE] checked:border-transparent"
                />
                Employer
              </label>
              <p className="text-[1.8rem] ml-[3.5rem]">
                Hiring, sourcing candidates, or posting a jobs
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end py-[3rem]">
          <Button
            action="Save Profile"
            width="w-[22rem]"
            handleClick={() => {
              route.push("/escrow");
            }}
            fontSize="text-[1.5rem]"
            rounded
          />
        </div>
      </div>
    </div>
  );
}
