import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Container } from "@/shared/ui/container";
import { ProfileSetupForm } from "@/widgets/profileSetupForm";
import { useTranslation } from "react-i18next";

export const ProfileSetupPage = () => {
  const { t } = useTranslation("profileSetup");
  return (
    <Container className="min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("profileSetup:title")}</CardTitle>
          <CardDescription>{t("profileSetup:description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSetupForm />
        </CardContent>
      </Card>
    </Container>
  );
};
