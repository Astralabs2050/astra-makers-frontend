"use client";

import { astraAddwork, cancelIcon, cancelSideIcon, cloudIcon } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import OnboardFrame from "@/shared/OnboardFrame";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BestWorks() {
  const route = useRouter();
  const [sideBar, setSideBar] = useState<boolean>(false);

  //Manage All Projects
  const [bestWorks, setBestWorks] = useState<
    {
      title: string;
      projectDescription: string;
      tags: string[];
      image: string[];
    }[]
  >([]);

  //Handle Portfolio Images
  const [previews, setPreviews] = useState<string[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      if (previews.length + selectedFiles.length > 4) {
        alert("You can only upload up to 4 images.");
        return;
      }
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prevPreviews) => [
            ...prevPreviews,
            reader.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  //Project Form
  const workForm = useFormik({
    initialValues: {
      title: "",
      tags: "",
      description: "",
    },
    validateOnMount: true,
    onSubmit: (values) => {
      setBestWorks((prev) => [
        ...prev,
        {
          title: values.title,
          projectDescription: values.description,
          tags: tagsArray,
          image: previews,
        },
      ]);
      setSideBar(false);
      setTags([]);
      setPreviews([]);
      workForm.resetForm();
    },
  });

  //Handle Tags
  const [tagsArray, setTags] = useState<string[]>([]);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newTags = workForm.values.tags;

      if (newTags !== "") {
        setTags((prevValues) => {
          const tagSet = new Set([...prevValues, newTags]);
          return Array.from(tagSet);
        });
        workForm.setFieldValue("tags", "");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tagsArray.filter((item) => item !== tag);
    setTags(updatedTags);
  };

  return (
    <div>
      <OnboardFrame link={`/experience`} pageNumber={3}>
        <h1 className="text-[3rem] text-center my-[5rem] font-bold">
          Upload some of your best works
        </h1>
        {bestWorks.length === 0 && (
          <div
            className="rounded-[1.5rem] bg-astraBorderGrey w-[50rem] h-[30rem] flex justify-center items-center mx-auto"
            onClick={() => {
              setSideBar(true);
            }}
          >
            <div className=" w-[max-content]  mx-auto ">
              <Image src={astraAddwork} alt="" width={60} height={60} />
            </div>
          </div>
        )}
        {bestWorks.length === 0 ? (
          <div></div>
        ) : (
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
                    <div
                      key={index}
                      className="w-[48%] h-[30rem] mx-auto flex items-center justify-center overflow-hidden"
                    >
                      <Image
                        src={pic}
                        alt=""
                        width={200}
                        height={200}
                        style={{ width: "auto", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <Button
                action="Upload more work"
                width="w-[50rem] mt-[3rem] mb-[2rem] mx-auto"
                handleClick={() => {
                  setSideBar(true);
                }}
                fontSize="text-[1.6rem]"
                inverse
              />
            </div>
          </div>
        )}

        <div>
          <Button
            action="Next"
            width="w-[50rem] mt-[3rem] mb-[2rem] mx-auto"
            handleClick={() => {
              if (typeof window !== "undefined") {
                const existingData = localStorage.getItem("storedOnboarding");
                const parsedData = existingData ? JSON.parse(existingData) : {};
                const updatedData = {
                  ...parsedData,
                  ...{ projects: bestWorks },
                };
                localStorage.setItem(
                  "storedOnboarding",
                  JSON.stringify(updatedData)
                );
              }
              route.push("/review");
            }}
            fontSize="text-[1.6rem]"
          />
        </div>
      </OnboardFrame>
      {sideBar && (
        <div className="w-full h-full bg-black opacity-20 inset-0 fixed z-20"></div>
      )}
      {sideBar && (
        <div className="w-[35vw] bg-white fixed right-0 top-0 z-30 px-[3rem] py-[3rem] h-[100vh] overflow-y-auto">
          <div
            onClick={() => {
              setSideBar(false);
            }}
            className="cursor-pointer"
          >
            <Image src={cancelSideIcon} alt="" width={24} height={24} />
          </div>
          <p className="text-center text-[2.4rem] font-bold mt-[-3rem]">
            Upload Your Work
          </p>
          <div className="mt-[3rem]">
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">
                Project Title
              </p>
              <InputField
                name="title"
                placeholder="What is the title of your project?"
                onChange={workForm.handleChange}
                onBlur={workForm.handleBlur}
                error={null}
                value={workForm.values.title}
                type="text"
                borderRadius="rounded-full"
                fontSize="text-[1.3rem]"
                marginBottom="mb-[2rem]"
              />
            </div>
            <div className="mb-[2rem]">
              <p className="text-[1.4rem] font-bold mb-[.7rem]">
                Upload project images (max. 4)
              </p>
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-center mx-auto"
              >
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-[1rem]">
                    {previews.map((preview, index) => (
                      <Image
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-[18rem] h-[18rem] object-cover mx-auto"
                        width={196}
                        height={196}
                      />
                    ))}
                  </div>
                )}
                {previews.length > 3 || (
                  <div className="border border-dashed bg-astraGreyBg p-[1rem] cursor-pointer">
                    <div className="w-[max-content] mx-auto">
                      <Image src={cloudIcon} alt="" width={30} height={30} />
                    </div>
                    <p className="text-astraLightBlack text-[1.4rem] text-center">
                      Drag and Drop .JPEG File
                    </p>
                    <p className="text-astraGrey text-[1.4rem] text-center">
                      or
                    </p>
                    <p className="text-black text-[1.4rem] text-center underline">
                      Upload from Device
                    </p>
                  </div>
                )}
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="mb-[2rem]">
              <p className="text-[1.4rem] font-bold mb-[.7rem]">
                Project Description
              </p>
              <textarea
                placeholder="Write a short description about the work"
                className="w-[100%] border border-astraGrey  text-astraTextGrey outline-none rounded-[1rem] text-[1.3rem] h-[10rem] p-[1rem]"
                onChange={workForm.handleChange}
                name="description"
                value={workForm.values.description}
              ></textarea>
            </div>
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">Project Tag</p>
              <InputField
                name="tags"
                placeholder=""
                onChange={workForm.handleChange}
                onBlur={workForm.handleBlur}
                onKeydown={handleKeyDown}
                error={null}
                value={workForm.values.tags}
                type="text"
                fontSize="text-[1.3rem]"
              >
                {tagsArray.length
                  ? tagsArray.map((text, index) => (
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
                          onClick={() => handleRemoveTag(text)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))
                  : ""}
              </InputField>
            </div>
          </div>
          <Button
            action="Upload"
            width="w-[100%] mt-[3rem]"
            handleClick={workForm.handleSubmit}
            fontSize="text-[1.6rem]"
          />
        </div>
      )}
    </div>
  );
}
