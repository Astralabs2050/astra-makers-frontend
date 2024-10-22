import NotificationSettingsBox from "@/components/settings/NotificationSettingsBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function NotificationSettings() {
  return (
    <DashboardFrame withSideBar>
      <NotificationSettingsBox />
    </DashboardFrame>
  );
}
