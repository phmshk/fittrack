import type { ProfileSearchSchema } from "@/entities/profile";
import type { User } from "@/entities/user";
import { GoalsTab, PersonalInfoTab, SettingsTab } from "@/widgets/profileTabs";
import { useSearch } from "@tanstack/react-router";

interface TabProps {
  userData: User;
}

export const ActiveTabComponent = (props: TabProps) => {
  const { userData } = props;
  const { tab } = useSearch({ from: "/_protectedRoutes/profile/" });

  const tabComponents: Record<
    ProfileSearchSchema["tab"],
    React.ComponentType<TabProps>
  > = {
    goals: GoalsTab,
    "personal-info": PersonalInfoTab,
    settings: SettingsTab,
  };

  const ComponentToRender = tabComponents[tab] || PersonalInfoTab;
  return <ComponentToRender userData={userData} />;
};
