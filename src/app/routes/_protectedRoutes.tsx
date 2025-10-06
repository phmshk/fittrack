import { useSessionStore } from "@/entities/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes")({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useSessionStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth",
        search: { tab: "login" },
        replace: true,
      });
    }
  },
  staticData: {
    showHeader: false,
    title: "",
    showBackButton: false,
    isNavRoute: false,
  },
});

function RouteComponent() {
  return <Outlet />;
}
