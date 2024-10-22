"use client";

import { cancelIcon, deleteIcon, uploadImage } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import OnboardFrame from "@/shared/OnboardFrame";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";

export default function ReviewBox() {
  const route = useRouter();

  //Image Management
  const [preview, setPreview] = useState(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as SetStateAction<null>);
      };
      reader.readAsDataURL(file);
    }
  };

  //Other Fields Management
  const review = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      location: "",
      skills: "",
      category: "",
      categoryBestSuit: "",
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
    onSubmit: () => {
      route.push("/verification");
    },
  });

  //Skill Management
  const [skillsArry, setSkills] = useState<string[]>([]);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newSkills = review.values.skills;

      if (newSkills !== "") {
        setSkills((prevValues) => {
          const skillSet = new Set([...prevValues, newSkills]);
          return Array.from(skillSet);
        });
        review.setFieldValue("skills", "");
      }
    }
  };
  const handleRemoveSkill = (skill: string) => {
    const UpdatedSkills = skillsArry.filter((item) => item !== skill);
    setSkills(UpdatedSkills);
  };

  //Category Management
  const [catArry, setCat] = useState<string[]>([]);
  const handleCatKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newCategories = review.values.category;

      if (newCategories !== "") {
        setCat((prevValues) => {
          const categorySet = new Set([...prevValues, newCategories]);
          return Array.from(categorySet);
        });
        review.setFieldValue("category", "");
      }
    }
  };

  const handleRemoveCat = (category: string) => {
    const updatedCategories = catArry.filter((item) => item !== category);
    setCat(updatedCategories);
  };

  //Work Experience
  const [experiences, setExperiences] = useState<
    {
      title: string;
      description: string;
      companyName: string;
      startYear: string;
      startMonth: string;
      endMonth: string;
      endYear: string;
    }[]
  >([]);
  const handleDelete = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  //Projects
  const [bestWorks, setBestWorks] = useState<
    {
      title: string;
      projectDescription: string;
      tags: string[];
      image: string[];
    }[]
  >([]);

  //Load values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOnboarding = localStorage.getItem("storedOnboarding");
      if (storedOnboarding) {
        const parsedOnboarding = JSON.parse(storedOnboarding);
        review.setFieldValue("email", parsedOnboarding.email);
        review.setFieldValue("fullName", parsedOnboarding.fullName);
        review.setFieldValue("password", parsedOnboarding.password);
        review.setFieldValue("location", parsedOnboarding.location);
        review.setFieldValue("category", parsedOnboarding.creatorType);
        setPreview(parsedOnboarding.profileImage);
        setSkills(parsedOnboarding.skills);
        setCat(parsedOnboarding.category);
        setExperiences(parsedOnboarding.work);
        setBestWorks(parsedOnboarding.projects);
      }
    }
  }, []);

  return (
    <OnboardFrame link="/portfolio" pageNumber={4}>
      <h1 className="text-[3rem] text-center my-[5rem] font-bold">
        Review your details
      </h1>
      <label
        htmlFor="imageUpload"
        className="cursor-pointer text-center mx-auto"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            className="w-[18rem] h-[18rem] rounded-full object-cover mx-auto"
            width={196}
            height={196}
          />
        ) : (
          <Image
            src={uploadImage}
            alt="Preview"
            width={196}
            height={196}
            className="w-[18rem] h-[18rem] object-cover rounded-full mx-auto"
          />
        )}
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-center underline text-[1.5rem] mt-[1rem]">
        Upload profile image
      </p>
      <div className="mx-[20rem] mt-[5rem]">
        <p className="text-[2rem] leading-none mb-[1rem]">Full Name</p>
        <InputField
          name="fullName"
          placeholder="Full Name"
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          error={
            review.touched.fullName && review.errors.fullName
              ? review.errors.fullName
              : null
          }
          value={review.values.fullName}
          type="text"
        />
        <p className="text-[2rem] leading-none mb-[1rem]">Email Address</p>
        <InputField
          name="email"
          placeholder="Email Address"
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          error={
            review.touched.email && review.errors.email
              ? review.errors.email
              : null
          }
          value={review.values.email}
          type="text"
        />
        <p className="text-[2rem] leading-none mb-[1rem]">
          What will you be joining Astra as?
        </p>
        <InputField
          name="category"
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          error={null}
          value={review.values.category}
          type="text"
        />
        <p className="text-[2rem] leading-none mb-[1rem]">
          What&apos;s your current location?
        </p>
        <InputField
          name="location"
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          error={
            review.touched.location && review.errors.location
              ? review.errors.location
              : null
          }
          value={review.values.location}
          type="text"
        />
        <p className="text-[2rem] leading-none mb-[1rem]">
          What category best suite you?
        </p>
        <InputField
          name="categoryBestSuite"
          placeholder=""
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          onKeydown={handleCatKeyDown}
          error={null}
          value={review.values.categoryBestSuit}
          type="text"
        >
          {catArry.length
            ? catArry.map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-[1rem] py-[.7rem] px-[2rem] rounded-full bg-astraBorderGrey min-w-[max-content]"
                >
                  <p className="text-black text-[1.4rem] min-w-[max-content]">
                    {text}
                  </p>
                  <Image
                    src={cancelIcon}
                    alt=""
                    width={15}
                    height={15}
                    onClick={() => handleRemoveCat(text)}
                    className="cursor-pointer"
                  />
                </div>
              ))
            : ""}
        </InputField>
        <p className="text-[2rem] leading-none mb-[1rem]">
          What are your skills?
        </p>
        <InputField
          name="skills"
          placeholder=""
          onChange={review.handleChange}
          onBlur={review.handleBlur}
          onKeydown={handleKeyDown}
          error={null}
          value={review.values.skills}
          type="text"
        >
          {skillsArry.length
            ? skillsArry.map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-[1rem] py-[.7rem] px-[2rem] rounded-full bg-astraBorderGrey min-w-[max-content]"
                >
                  <p className="text-black text-[1.4rem] min-w-[max-content]">
                    {text}
                  </p>
                  <Image
                    src={cancelIcon}
                    alt=""
                    width={15}
                    height={15}
                    onClick={() => handleRemoveSkill(text)}
                    className="cursor-pointer"
                  />
                </div>
              ))
            : ""}
        </InputField>
        <div className="mb-[3rem]">
          <p className="text-black font-[600] text-[1.8rem] mb-[1rem]">
            YOUR WORK EXPERIENCE
          </p>
          {experiences.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-astraOffWhite border py-[1.2rem] px-[2rem] rounded-[.5rem]  border-astraSilver mb-[1rem]"
            >
              <div>
                <p className="text-[1.5rem] mb-[1rem] font-bold">
                  {`${item.title} - ${item.companyName}`}
                </p>
                <p className="text-[1.5rem]">{`${item.startMonth} ${item.startYear} - ${item.endMonth} ${item.endYear}`}</p>
              </div>
              <div className="flex gap-x-[1rem]">
                <div className="cursor-pointer">
                  <Image
                    src={deleteIcon}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-black font-[600] text-[1.8rem] mb-[1rem]">
            YOUR UPLOADED WORKS
          </p>
          <div>
            {bestWorks.map((item, index) => (
              <div
                key={index}
                className="p-[2rem] w-[50rem] mx-auto border rounded-[1rem] mt-[2rem]"
              >
                <p className="text-[1.8rem]">{item.title}</p>
                <hr className="my-[1.4rem]" />
                <div className="flex">
                  {item.image.map((pic, index) => (
                    <div key={index} className="w-[48%]  mx-auto">
                      <Image
                        src={pic}
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
            {/* <div>
              <Button
                action="Upload more work"
                width="w-[50rem] mt-[3rem] mb-[2rem] mx-auto"
                handleClick={() => {}}
                fontSize="text-[1.6rem]"
                inverse
              />
            </div> */}
          </div>
        </div>
        <Button
          action="Save & Complete"
          width="w-[100%] mt-[3rem] mb-[2rem]"
          handleClick={() => {
            route.push("/confirmation");
          }}
          fontSize="text-[1.6rem]"
        />
      </div>
    </OnboardFrame>
  );
}
