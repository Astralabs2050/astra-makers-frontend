import OngoingJobBox from "@/components/ongoingJobs/OngoingJobBox";
import DashboardFrame from "@/shared/DashboardFrame";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function OngoingJobs() {
  return (
    <DashboardFrame withSideBar>
      <Suspense
        fallback={
          <div>
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <OngoingJobBox />
      </Suspense>
    </DashboardFrame>
  );
}
