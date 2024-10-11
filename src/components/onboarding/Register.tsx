"use client";

import { googleLogo } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function Register() {
  const route = useRouter();
  const register = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      fullName: Yup.string()
        .min(2, "Full Name must be at least 2 characters")
        .required("Full Name is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      route.push("/verification");
    },
  });

  return (
    <div className="py-[8rem] px-[14rem] bg-white">
      <h1 className="text-center text-[30px] font-[500]">
        Sign Up to Astra as a Talent
      </h1>
      <p className="text-[1.8rem] text-astraGray text-center">
        Create an account to discover global fashion jobs.
      </p>
      <button className="flex justify-center items-center gap-x-[2rem] border border-black rounded-[1rem] py-[1.6rem] w-[100%] mt-[3rem]">
        <div>
          <Image src={googleLogo} alt="" height={20} width={20} />
        </div>
        <p className="text-black text-[1.6rem] font-[600]">
          Continue with Google
        </p>
      </button>
      <hr className="w-[100%] border-[#E0E0E0] my-[4rem]" />

      <InputField
        name="fullName"
        placeholder="Full Name"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.fullName && register.errors.fullName
            ? register.errors.fullName
            : null
        }
        value={register.values.fullName}
        type="text"
      />
      <InputField
        name="email"
        placeholder="Enter your email address"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.email && register.errors.email
            ? register.errors.email
            : null
        }
        value={register.values.email}
        type="email"
      />
      <InputField
        name="password"
        placeholder="Enter your password"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.password && register.errors.password
            ? register.errors.password
            : null
        }
        value={register.values.password}
        type="password"
      />
      <p className="text-[1.2rem] text-astraLightBlack">
        Password must have at least 8 characters, 1 uppercase letter and 1
        number.
      </p>
      <Button
        action="Create Account"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={register.handleSubmit}
        fontSize="text-[1.6rem]"
        isDisabled={!register.isValid}
      />
      <p className="text-[1.5rem] text-astraLightBlack text-center">
        You acknowledge that you read, and agree to our <br />
        <span className="text-black text-[1.5rem] underline">
          Terms of Service
        </span>{" "}
        and our{" "}
        <span className="text-black text-[1.5rem] underline">
          Privacy Policy
        </span>
      </p>
    </div>
  );
}
