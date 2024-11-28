import ApplicationForm from "@/components/dashboard/ApplicationForm";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <ApplicationForm />
      </Suspense>
    </div>
  );
}
