"use client";
import { addImageIcon, cancelSideIcon, deleteIcon, editIcon } from "@/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import OnboardFrame from "@/shared/OnboardFrame";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function WorkExperience() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  //Manage Work Experiences
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
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const experienceForm = useFormik({
    initialValues: {
      employer: "",
      jobTitle: "",
      description: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
    validationSchema: Yup.object().shape({
      employer: Yup.string().required("Employer is required"),
      jobTitle: Yup.string().required("Job title is required"),
      description: Yup.string().required("Description is required"),
      startMonth: Yup.string()
        .required("Start month is required")
        .oneOf(
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          "Start month must be a valid month (January - December)"
        ),
      startYear: Yup.number()
        .required("Start year is required")
        .min(1900, "Start year must be greater than or equal to 1900")
        .max(new Date().getFullYear(), `Start year cannot be in the future`),
      endMonth: Yup.string()
        .required("End month is required")
        .oneOf(
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          "End month must be a valid month (January - December)"
        ),
      endYear: Yup.number()
        .required("End year is required")
        .min(1900, "End year must be greater than or equal to 1900")
        .max(new Date().getFullYear(), "End year cannot be in the future")
        .test(
          "is-greater",
          "End year must be greater than start year",
          function (value) {
            const { startYear } = this.parent;
            return value >= startYear;
          }
        ),
    }),
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editingIndex !== null) {
        const updatedExperiences = experiences.map((experience, index) =>
          index === editingIndex
            ? {
                title: values.jobTitle,
                description: values.description,
                companyName: values.employer,
                startYear: values.startYear,
                startMonth: values.startMonth,
                endMonth: values.endMonth,
                endYear: values.endYear,
              }
            : experience
        );
        setExperiences(updatedExperiences);
      } else {
        setExperiences((prev) => [
          ...prev,
          {
            title: values.jobTitle,
            description: values.description,
            companyName: values.employer,
            startYear: values.startYear,
            startMonth: values.startMonth,
            endMonth: values.endMonth,
            endYear: values.endYear,
          },
        ]);
      }
      setSideBar(false);
      experienceForm.resetForm();
      setEditingIndex(null);
    },
  });

  //Edit Work Experience
  const handleEdit = (index: number) => {
    const experience = experiences[index];
    experienceForm.setValues({
      employer: experience.companyName,
      jobTitle: experience.title,
      description: experience.description,
      startMonth: experience.startMonth,
      startYear: experience.startYear,
      endMonth: experience.endMonth,
      endYear: experience.endYear,
    });
    setEditingIndex(index);
    setSideBar(true);
  };

  //Delete Work Experience
  const handleDelete = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <OnboardFrame link={`/about?category=${category}`} pageNumber={2}>
      <h1 className="text-[3rem] text-center my-[5rem] font-bold">
        Work Experience
      </h1>
      <div className="w-[50%] mx-auto">
        {experiences.length === 0 && (
          <div className="border rounded-[1rem] p-[2.1rem]">
            <div className="bg-astraBorderGrey rounded-[1.5rem] p-[1.5rem]">
              <p className="text-center text-[1.5rem] text-astraTextGrey">
                Auto-Fill with Resume
              </p>
              <div
                className=" w-[max-content] mt-[1.2rem] mx-auto"
                onClick={() => {
                  setSideBar(true);
                }}
              >
                <Image src={addImageIcon} alt="" width={46} height={46} />
              </div>
            </div>
          </div>
        )}
        {experiences.length > 0 && (
          <div>
            <p className="text-[1.5rem] mt-[3rem] mb-[2rem] font-bold">
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
                      src={editIcon}
                      alt=""
                      width={20}
                      height={20}
                      onClick={() => handleEdit(index)}
                    />
                  </div>
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
            <div>
              <Button
                action="Add Experience"
                width="w-[100%] mt-[3rem] mb-[2rem]"
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
          <div>
            <Button
              action="Next"
              width="w-[100%] mt-[3rem] mb-[2rem]"
              handleClick={() => {
                if (typeof window !== "undefined") {
                  const existingData = localStorage.getItem("storedOnboarding");
                  const parsedData = existingData
                    ? JSON.parse(existingData)
                    : {};
                  const updatedData = {
                    ...parsedData,
                    ...{ work: experiences },
                  };
                  localStorage.setItem(
                    "storedOnboarding",
                    JSON.stringify(updatedData)
                  );
                }
                route.push("/portfolio");
              }}
              fontSize="text-[1.6rem]"
            />
          </div>
        </div>
      </div>
      {sideBar && (
        <div className="w-full h-full bg-black opacity-20 inset-0 fixed z-20"></div>
      )}
      {sideBar && (
        <div className="w-[35vw] bg-white  h-full fixed right-0 top-0 z-30 px-[3rem] py-[3rem]">
          <div
            onClick={() => {
              setSideBar(false);
            }}
            className="cursor-pointer"
          >
            <Image src={cancelSideIcon} alt="" width={24} height={24} />
          </div>
          <p className="text-center text-[2.4rem] font-bold mt-[-3rem]">
            Add Experience
          </p>
          <div className="mt-[3rem]">
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">
                Employer Name *
              </p>
              <InputField
                name="employer"
                placeholder="What is the name of your employer?"
                onChange={experienceForm.handleChange}
                onBlur={experienceForm.handleBlur}
                error={
                  experienceForm.touched.employer &&
                  experienceForm.errors.employer
                    ? experienceForm.errors.employer
                    : null
                }
                value={experienceForm.values.employer}
                type="text"
                borderRadius="rounded-full"
                fontSize="text-[1.3rem]"
                marginBottom="mb-[2rem]"
              />
            </div>
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">Job Title *</p>
              <InputField
                name="jobTitle"
                placeholder="What is your role?"
                onChange={experienceForm.handleChange}
                onBlur={experienceForm.handleBlur}
                error={
                  experienceForm.touched.jobTitle &&
                  experienceForm.errors.jobTitle
                    ? experienceForm.errors.jobTitle
                    : null
                }
                value={experienceForm.values.jobTitle}
                type="text"
                borderRadius="rounded-full"
                fontSize="text-[1.3rem]"
                marginBottom="mb-[2rem]"
              />
            </div>
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">Start Date</p>
              <div className="flex justify-between items gap-x-[1rem]">
                <InputField
                  name="startMonth"
                  placeholder="Month"
                  onChange={experienceForm.handleChange}
                  onBlur={experienceForm.handleBlur}
                  error={
                    experienceForm.touched.startMonth &&
                    experienceForm.errors.startMonth
                      ? experienceForm.errors.startMonth
                      : null
                  }
                  value={experienceForm.values.startMonth}
                  type="text"
                  borderRadius="rounded-full"
                  fontSize="text-[1.3rem]"
                  marginBottom="mb-[2rem]"
                />
                <InputField
                  name="startYear"
                  placeholder="Year"
                  onChange={experienceForm.handleChange}
                  onBlur={experienceForm.handleBlur}
                  error={
                    experienceForm.touched.startYear &&
                    experienceForm.errors.startYear
                      ? experienceForm.errors.startYear
                      : null
                  }
                  value={experienceForm.values.startYear}
                  type="text"
                  borderRadius="rounded-full"
                  fontSize="text-[1.3rem]"
                  marginBottom="mb-[2rem]"
                />
              </div>
            </div>
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">End Date</p>
              <div className="flex justify-between items gap-x-[1rem]">
                <InputField
                  name="endMonth"
                  placeholder="Month"
                  onChange={experienceForm.handleChange}
                  onBlur={experienceForm.handleBlur}
                  error={
                    experienceForm.touched.endMonth &&
                    experienceForm.errors.endMonth
                      ? experienceForm.errors.endMonth
                      : null
                  }
                  value={experienceForm.values.endMonth}
                  type="text"
                  borderRadius="rounded-full"
                  fontSize="text-[1.3rem]"
                  marginBottom="mb-[2rem]"
                />
                <InputField
                  name="endYear"
                  placeholder="Year"
                  onChange={experienceForm.handleChange}
                  onBlur={experienceForm.handleBlur}
                  error={
                    experienceForm.touched.endYear &&
                    experienceForm.errors.endYear
                      ? experienceForm.errors.endYear
                      : null
                  }
                  value={experienceForm.values.endYear}
                  type="text"
                  borderRadius="rounded-full"
                  fontSize="text-[1.3rem]"
                  marginBottom="mb-[2rem]"
                />
              </div>
            </div>
            <div>
              <p className="text-[1.4rem] font-bold mb-[.7rem]">
                Job Description
              </p>
              <textarea
                placeholder="Write a short description about the job"
                className="w-[100%] border border-astraGrey  text-astraTextGrey outline-none rounded-[1rem] text-[1.3rem] h-[8rem] p-[1rem]"
                onChange={experienceForm.handleChange}
                value={experienceForm.values.description}
                name="description"
              ></textarea>
            </div>
          </div>
          <Button
            action="Add Experience"
            width="w-[100%] mt-[3rem]"
            handleClick={experienceForm.handleSubmit}
            fontSize="text-[1.6rem]"
          />
        </div>
      )}
    </OnboardFrame>
  );
}
