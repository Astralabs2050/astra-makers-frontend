import SecuritySettingsBox from "@/components/settings/SecuritySettingsBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function SecurtitySettings() {
  return (
    <DashboardFrame withSideBar>
      <SecuritySettingsBox />
    </DashboardFrame>
  );
}
