import JobBox from "@/components/dashboard/JobBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Dashboard() {
  return (
    <DashboardFrame withSideBar>
      <JobBox />
    </DashboardFrame>
  );
}
