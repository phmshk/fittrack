import { useGetUserData } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { Spinner } from "@/shared/ui/spinner";
import { useSearch } from "@tanstack/react-router";
import { OverviewTab } from "./tabs/OverviewTab";
import { GoalsTab } from "./tabs/GoalsTab";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { ProgressTab } from "./tabs/ProgressTab";
import { SettingsTab } from "./tabs/SettingsTab";
import type { ProfileSearchSchema } from "../model/zodSchema";
import { ProfileSidebar } from "@/widgets/profileSidebar";
import { H1 } from "@/shared/ui/headings";

const tabComponents: Record<ProfileSearchSchema["tab"], React.ComponentType> = {
  overview: OverviewTab,
  goals: GoalsTab,
  "personal-info": PersonalInfoTab,
  progress: ProgressTab,
  settings: SettingsTab,
};

export const ProfilePage = () => {
  const { data: user, isLoading } = useGetUserData();
  const { tab } = useSearch({ from: "/_protectedRoutes/profile/" });

  const ActiveTabComponent = tabComponents[tab] || OverviewTab;

  if (isLoading || !user) {
    return (
      <Container className="items-center justify-center">
        <Spinner text="Loading your profile..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>Hello, {user.name.split(" ")[0]}</H1>
        <p className="text-muted-foreground">
          You can manage your personal information, goals, and settings here.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <ProfileSidebar />
        </aside>
        <div className="md:col-span-3">
          <ActiveTabComponent />
        </div>
      </div>
    </Container>
  );
};
