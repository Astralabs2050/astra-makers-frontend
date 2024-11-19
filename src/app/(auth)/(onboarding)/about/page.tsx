import AboutForm from "@/components/onboarding/About";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function About() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center my-[3rem]">
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <AboutForm />
      </Suspense>
    </div>
  );
}
