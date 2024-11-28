import ProfileSetttingsBox from "@/components/settings/ProfileSettingsBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function ProfileSettings() {
  return (
    <DashboardFrame withSideBar>
      <ProfileSetttingsBox />
    </DashboardFrame>
  );
}
