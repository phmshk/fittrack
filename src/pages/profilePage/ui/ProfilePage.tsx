import { useGetUserData } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { Spinner } from "@/shared/ui/spinner";
import { ProfileSidebar } from "@/widgets/profileSidebar";
import { H1 } from "@/shared/ui/headings";
import { useBreakpoint } from "@/shared/lib";
import { ActiveTabComponent } from "./ActiveTab";

export const ProfilePage = () => {
  const { data: userData, isLoading } = useGetUserData();
  const isMobile = useBreakpoint();

  if (isLoading || !userData) {
    return (
      <Container className="items-center justify-center">
        <Spinner text="Loading your profile..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>Hello, {userData.name.split(" ")[0]}</H1>
        <p className="text-muted-foreground">
          You can manage your personal information, goals, and settings here.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {!isMobile && (
          <aside className="md:col-span-1">
            <ProfileSidebar />
          </aside>
        )}
        <div className="md:col-span-3">
          <ActiveTabComponent userData={userData} />
        </div>
      </div>
    </Container>
  );
};
