import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Container } from "@/shared/ui/container";
import { ProfileSetupForm } from "@/widgets/profileSetupForm";

export const ProfileSetupPage = () => {
  return (
    <Container className="min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to FitTrack!</CardTitle>
          <CardDescription>
            Let's set up your profile. This will help us tailor your experience.
            Please provide some basic information to get started. <br />
            You can always update this information later in your profile
            settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSetupForm />
        </CardContent>
      </Card>
    </Container>
  );
};
