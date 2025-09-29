import { AuthForm } from "@/widgets/authentication";
import auth_image from "@/shared/assets/img/auth_img.png";
const AUTH_IMAGE_URL = auth_image;

export const AuthPage = () => {
  return (
    <section className="container mx-auto flex min-h-screen grow flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-background shadow-2xl md:flex-row">
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
          <AuthForm />
        </div>

        <div className="hidden w-1/2 items-center justify-center md:flex">
          <img
            src={AUTH_IMAGE_URL}
            alt="Inspirational fitness-related image showing healthy lifestyle"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
