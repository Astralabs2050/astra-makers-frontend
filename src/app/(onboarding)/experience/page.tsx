import WorkExperience from "@/components/onboarding/WorkExperience";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function Experience() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center my-[3rem]">
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <WorkExperience />
      </Suspense>
    </div>
  );
}
