import OngoingJobBox from "@/components/ongoingJobs/OngoingJobBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function OngoingJobs() {
  return (
    <DashboardFrame withSideBar>
      <OngoingJobBox />
    </DashboardFrame>
  );
}
