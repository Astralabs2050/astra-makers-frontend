import SettingsBox from "@/components/settings/SettingBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function AccountSettings() {
  return (
    <DashboardFrame withSideBar>
      <SettingsBox />
    </DashboardFrame>
  );
}
