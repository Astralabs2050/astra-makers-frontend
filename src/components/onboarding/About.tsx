"use client";

import { uploadImage } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import OnboardFrame from "@/shared/OnboardFrame";
import OptionBox from "@/shared/OptionBox";
import { useFormik } from "formik";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import * as Yup from "yup";

export default function AboutForm() {
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

  const options = [
    "3D Fashion Artist",
    "Fashion Illustrator",
    "Tech Pack Designer",
    "Graphics Designer",
  ];

  const [tickedOptions, setTickedOptions] = useState<{
    [key: string]: boolean;
  }>({
    "3D Fashion Artist": false,
    "Fashion Illustrator": false,
    "Tech Pack Designer": false,
    "Graphics Designer": false,
  });

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

  const about = useFormik({
    initialValues: {
      location: "",
      skills: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: () => {},
  });

  return (
    <OnboardFrame link="/niche" pageNumber={2}>
      <p className="text-[3rem] text-center mt-[3rem] mb-[4rem]">
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
          onChange={about.handleChange}
          onBlur={about.handleBlur}
          error={null}
          value={about.values.location}
          type="text"
        />
        <p className="mt-[5rem] text-[2rem] mb-[3rem]">
          What category best suites you? (Select two options)
        </p>
        <div className="flex flex-wrap gap-[2rem]">
          {options.map((item) => (
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
          onChange={about.handleChange}
          onBlur={about.handleBlur}
          error={null}
          value={about.values.skills}
          type="text"
        />
        <Button
          action="Next - Enter Work Experience"
          width="w-[100%] mt-[5rem] mb-[3rem]"
          handleClick={() => {}}
          fontSize="text-[1.6rem]"
        />
      </div>
    </OnboardFrame>
  );
}
