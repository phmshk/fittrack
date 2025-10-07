import { useSearch } from "@tanstack/react-router";
import { OverviewTab } from "./tabs/OverviewTab";
import { GoalsTab } from "./tabs/GoalsTab";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { ProgressTab } from "./tabs/ProgressTab";
import { SettingsTab } from "./tabs/SettingsTab";
import type { ProfileSearchSchema } from "@/entities/profile";

const tabComponents: Record<ProfileSearchSchema["tab"], React.ComponentType> = {
  overview: OverviewTab,
  goals: GoalsTab,
  "personal-info": PersonalInfoTab,
  progress: ProgressTab,
  settings: SettingsTab,
};

export const ActiveTabComponent = () => {
  const { tab } = useSearch({ from: "/_protectedRoutes/profile/" });

  const ActiveTabComponent = tabComponents[tab] || OverviewTab;

  return <ActiveTabComponent />;
};
