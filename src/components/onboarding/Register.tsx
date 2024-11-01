"use client";

import { googleLogo } from "@/image";
import { signupStepOne } from "@/network/auth";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function Register() {
  const route = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signupStepOne,
  });

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
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least one uppercase letter and one number"
        ),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      const onboardingData = {
        email: values.email,
        fullName: values.fullName,
        password: values.password,
        profileImage: "",
        location: "",
        category: "",
        skills: [],
        creatorType: "digital",
        work: [],
        projects: [],
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "storedOnboarding",
          JSON.stringify(onboardingData)
        );
      }
      const res = await mutateAsync({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      });
      if (res && "error" in res) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        route.push("/verification");
      }
    },
  });

  return (
    <div className="py-[8rem] px-[14rem] w-[100%] bg-white">
      <h1 className="text-center text-[30px] font-bold">
        Sign Up to Astra as a Talent
      </h1>
      <p className="text-[1.8rem] text-astraGray text-center">
        Create an account to discover global fashion jobs.
      </p>
      <button className="flex justify-center items-center gap-x-[2rem] border border-black rounded-[1rem] py-[1.6rem] w-[100%] mt-[3rem]">
        <div>
          <Image src={googleLogo} alt="" height={20} width={20} />
        </div>
        <p className="text-black text-[1.6rem] font-bold">
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
        password
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
        animate={isPending}
        isDisabled={!register.isValid || isPending}
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
