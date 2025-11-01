import { AuthForm } from "@/widgets/authentication";
import auth_image from "@/shared/assets/img/auth_img.png";
import { Container } from "@/shared/ui/container/ui/Container";
import { useTranslation } from "react-i18next";
const AUTH_IMAGE_URL = auth_image;

export const AuthPage = () => {
  const { t } = useTranslation("auth");
  return (
    <Container className="min-h-screen grow items-center justify-center">
      <div className="bg-card mx-auto flex h-4/5 w-full max-w-4xl flex-col overflow-hidden rounded-xl shadow-2xl md:flex-row">
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
          <AuthForm />
        </div>

        <div className="hidden w-1/2 items-center justify-center md:flex">
          <img
            src={AUTH_IMAGE_URL}
            alt={t("auth:imgAltLogin")}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
};
