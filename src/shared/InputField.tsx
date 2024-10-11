"use client";

import { passwordEye } from "@/image";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
interface InputFieldProps {
  password?: boolean;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
  error: string | null;
  name: string;
  value: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export default function InputField({
  password,
  error,
  type,
  placeholder,
  name,
  onChange,
  onBlur,
  value,
  isDisabled,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (password) {
    return (
      <div className="w-[100%] my-[1.5rem]">
        <div
          className={`${
            error ? "border-red-700" : "border-astraGrey "
          } border-[0.1rem] py-[1.8rem] px-[2.4rem] rounded-[.8rem] w-[100%] flex items-center`}
        >
          <div className="w-[100%] mr-[1rem]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              name={name}
              onChange={onChange as ChangeEventHandler<HTMLInputElement>}
              onBlur={onBlur}
              value={value}
              className="text-[1.6rem] text-astraLightBlack w-[100%] outline-none bg-transparent"
              disabled={isDisabled}
            />
          </div>
          <div className="w-[2.4rem]" onClick={togglePasswordVisibility}>
            <Image
              src={showPassword ? passwordEye : passwordEye}
              alt={"input icon"}
              style={{
                width: "100%",
                height: "auto",
              }}
              height={20}
              width={70}
            />
          </div>
        </div>
        {error && <div className="text-[1.3rem] text-red-700 ">{error}</div>}
      </div>
    );
  }
  return (
    <div className="my-[1.5rem] w-[100%]">
      <div
        className={`${
          error ? "border-red-700" : "border-astraGrey "
        } border-[0.1rem] py-[1.8rem] px-[2.4rem] rounded-[.8rem] w-[100%] flex items-center`}
      >
        <div className="w-[100%]">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur}
            value={value}
            className="text-[1.6rem] text-astraLightBlack w-[100%] outline-none bg-transparent"
            disabled={isDisabled}
          />
        </div>
      </div>
      {error && <div className="text-[1.3rem] text-red-700">{error}</div>}
    </div>
  );
}
