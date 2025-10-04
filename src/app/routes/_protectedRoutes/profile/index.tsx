import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protectedRoutes/profile"!</div>;
}
