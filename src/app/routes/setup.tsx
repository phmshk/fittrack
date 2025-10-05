import { useSessionStore } from "@/entities/user";
import { ProfileSetupPage } from "@/pages/profileSetupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup")({
  component: ProfileSetupPage,
  beforeLoad: () => {
    const user = useSessionStore.getState();

    console.log("User in /setup beforeLoad:", user);
  },
});
