import EarningBox from "@/components/earnings/EarningBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Earnings() {
  return (
    <DashboardFrame withSideBar>
      <EarningBox />
    </DashboardFrame>
  );
}
