"use client";

import { cancelIcon, uploadImage } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import LoaderSvg from "@/shared/LoaderSvg";
import OnboardFrame from "@/shared/OnboardFrame";
import OptionBox from "@/shared/OptionBox";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import * as Yup from "yup";

export default function AboutFormForm() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  //Handle Profile Image Upload
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

  //Skill Category List
  const digitalCreatorOptions = [
    "3D Fashion Artist",
    "Fashion Illustrator",
    "Tech Pack Designer",
    "Graphics Designer",
  ];
  const physicalMakerOptions = [
    "Freelance Tailor",
    "Small scale Manufacturer ",
    "Large scale Manufacturer ",
  ];

  //Manage Selected Skill Category
  const [tickedOptions, setTickedOptions] = useState<{
    [key: string]: boolean;
  }>({
    "3D Fashion Artist": false,
    "Fashion Illustrator": false,
    "Tech Pack Designer": false,
    "Graphics Designer": false,
    "Freelance Tailor": false,
    "Small scale Manufacturer": false,
    "Large scale Manufacturer": false,
  });

  //Handle Skill Select
  const handleToggle = (option: string) => {
    const selectedCount = Object.values(tickedOptions).filter(
      (ticked) => ticked
    ).length;
    if (tickedOptions[option] || selectedCount < 2) {
      setTickedOptions((prevState) => ({
        ...prevState,
        [option]: !prevState[option],
      }));
    }
  };

  const aboutForm = useFormik({
    initialValues: {
      location: "",
      skills: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: () => {},
  });

  //Handle Skill Ticking
  const [skillsArry, setSkills] = useState<string[]>([]);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newSkills = aboutForm.values.skills;

      if (newSkills !== "") {
        setSkills((prevValues) => {
          const skillSet = new Set([...prevValues, newSkills]);
          return Array.from(skillSet);
        });
        aboutForm.setFieldValue("skills", "");
      }
    }
  };

  //Handle  skill removal
  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skillsArry.filter((item) => item !== skill);
    setSkills(updatedSkills);
  };

  if (!category) {
    return (
      <div className="flex justify-center items-center my-[2rem]">
        <LoaderSvg color="#000000" />
      </div>
    );
  }

  return (
    <OnboardFrame link="/niche" pageNumber={2}>
      <p className="text-[3rem] text-center mt-[3rem] mb-[4rem] font-bold">
        Tell us a little about yourself
      </p>
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
      <div className="mt-[5rem] mx-[15rem]">
        <p className="text-[2rem]">What is your current location?</p>
        <InputField
          name="location"
          placeholder="Enter your location"
          onChange={aboutForm.handleChange}
          onBlur={aboutForm.handleBlur}
          error={null}
          value={aboutForm.values.location}
          type="text"
        />
        <p className="mt-[5rem] text-[2rem] mb-[3rem]">
          What category best suites you? (Select two options)
        </p>
        <div className="flex flex-wrap gap-[2rem]">
          {category && category === "physical"
            ? physicalMakerOptions.map((item) => (
                <OptionBox
                  key={item}
                  text={item}
                  ticked={tickedOptions[item]}
                  onClick={() => handleToggle(item)}
                />
              ))
            : digitalCreatorOptions.map((item) => (
                <OptionBox
                  key={item}
                  text={item}
                  ticked={tickedOptions[item]}
                  onClick={() => handleToggle(item)}
                />
              ))}
        </div>
        <p className="mt-[5rem] text-[2rem] text-center">
          What are your skills?
        </p>
        <InputField
          name="skills"
          placeholder=""
          onChange={aboutForm.handleChange}
          onBlur={aboutForm.handleBlur}
          onKeydown={handleKeyDown}
          error={null}
          value={aboutForm.values.skills}
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
        <div className=" flex items-center gap-[.8rem] w-[100%] flex-wrap mb-[3rem]"></div>
        <Button
          action="Next - Enter Work Experience"
          width="w-[100%] mt-[5rem] mb-[3rem]"
          handleClick={() => {
            const storedOnboardingData = {
              profileImage: preview,
              location: aboutForm.values.location,
              category:
                Object.entries(tickedOptions)
                  .filter(([, isSelected]) => isSelected)
                  .map(([skill]) => skill) || [],
              skills: skillsArry,
              creatorType: category,
            };
            if (typeof window !== "undefined") {
              const existingData = localStorage.getItem("storedOnboarding");
              const parsedData = existingData ? JSON.parse(existingData) : {};
              const updatedData = {
                ...parsedData,
                ...storedOnboardingData,
              };
              localStorage.setItem(
                "storedOnboarding",
                JSON.stringify(updatedData)
              );
            }
            route.push(`/experience?category=${category}`);
          }}
          fontSize="text-[1.6rem]"
        />
      </div>
    </OnboardFrame>
  );
}
