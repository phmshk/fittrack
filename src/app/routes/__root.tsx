import { Header } from "@/widgets/header";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

const RootComponent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isAddFoodPage = location.pathname.startsWith("/addFood");

  return (
    <>
      {!isAuthPage && !isAddFoodPage && <Header />}
      <main className="min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>
      <Toaster duration={2000} position="top-center" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
