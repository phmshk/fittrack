import { Header } from "@/widgets/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

const RootComponent = () => (
  <>
    <Header />
    <main className="min-h-[calc(100vh-65px)]">
      <Outlet />
    </main>
    <Toaster duration={2000} position="top-center" />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
});
