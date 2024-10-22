"use client";

import { settingsBack, verifiedIcon } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SecuritySettingsBox() {
  const route = useRouter();
  const settingsForm = useFormik({
    initialValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
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
          <p className="text-[3rem] font-bold">Password & Security</p>
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
            This is login information that you can update anytime.
          </p>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <div className="w-[25%]">
            <p className="text-[1.8rem] font-bold">Update Email</p>
            <p className="text-[1.6rem]">
              Update your email address to make sure it is safe
            </p>
          </div>
          <div className="w-[52rem]">
            <div className="flex items-center gap-x-[.8rem]">
              <p className="text-[1.8rem] font-bold">jakegyll@email.com</p>
              <div>
                <Image src={verifiedIcon} alt="" height={24} width={24} />
              </div>
            </div>
            <p className="text-[1.8rem] text-astraTextGrey">
              Your email address is verified.
            </p>
            <div className="w-[100%] mt-[2rem]">
              <p className="text-[1.6rem]  mb-[.5rem] ">Update Email</p>
              <InputField
                name="email"
                onChange={settingsForm.handleChange}
                placeholder="Enter your new email"
                onBlur={settingsForm.handleBlur}
                error={null}
                value={settingsForm.values.email}
                type="text"
                borderRadius="rounded-none"
                fontSize="text-[1.5rem]"
                marginBottom="mb-[2rem]"
              />
              <Button
                action="Update Email"
                width="w-[17rem]"
                handleClick={() => {
                  route.push("");
                }}
                fontSize="text-[1.5rem]"
                rounded
              />
            </div>
          </div>
        </div>
        <div className="flex py-[3rem] border-b gap-x-[10rem]">
          <div className="w-[25%]">
            <p className="text-[1.8rem] font-bold">New Password</p>
            <p className="text-[1.6rem]">
              Manage your password to make sure it is safe
            </p>
          </div>
          <div className="w-[52rem]">
            <div className="w-[100%] mt-[2rem]">
              <p className="text-[1.6rem]  mb-[.5rem] ">Old Password</p>
              <InputField
                name="oldPassword"
                onChange={settingsForm.handleChange}
                placeholder="Enter your new email"
                onBlur={settingsForm.handleBlur}
                error={null}
                value={settingsForm.values.oldPassword}
                type="text"
                borderRadius="rounded-none"
                fontSize="text-[1.5rem]"
                marginBottom="mb-[.5rem]"
              />
              <p className="text-[1.4rem] text-astraTextGrey mb-[2.4rem]">
                Minimum 8 characters
              </p>
              <p className="text-[1.6rem]  mb-[.5rem] ">New Password</p>
              <InputField
                name="newPassword"
                onChange={settingsForm.handleChange}
                placeholder="Enter your new email"
                onBlur={settingsForm.handleBlur}
                error={null}
                value={settingsForm.values.newPassword}
                type="text"
                borderRadius="rounded-none"
                fontSize="text-[1.5rem]"
                marginBottom="mb-[.5rem]"
              />
              <p className="text-[1.4rem] text-astraTextGrey mb-[2.4rem]">
                Minimum 8 characters
              </p>
              <Button
                action="Change Password"
                width="w-[17rem]"
                handleClick={() => {
                  route.push("");
                }}
                fontSize="text-[1.5rem]"
                rounded
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
