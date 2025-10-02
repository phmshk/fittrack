import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth",
        search: { tab: "login" },
        replace: true,
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
