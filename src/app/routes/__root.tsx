import { Toaster } from "@/shared/shadcn/components/ui/sonner";
import { Header } from "@/widgets/header/index";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootComponent = () => (
  <>
    <Header />
    <main className="py-x min-h-[calc(100vh-65px)]">
      <Outlet />
    </main>
    <Toaster duration={2000} position="top-center" />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
});
