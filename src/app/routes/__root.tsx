import type { useSessionStore } from "@/entities/user/model/useSession";
import { Header } from "@/widgets/header";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useLocation,
  isRedirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { userQueryOptions } from "@/entities/user";
import { queryClient } from "../providers/queryClient";

interface RouterContext {
  auth: ReturnType<typeof useSessionStore.getState>;
}

const RootComponent = () => {
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");
  const isAddFoodPage = location.pathname.startsWith("/addFood");
  const isProfileSetupPage = location.pathname.startsWith("/setup");

  const showHeader = !isAuthPage && !isAddFoodPage && !isProfileSetupPage;

  return (
    <>
      {showHeader && <Header />}
      <main className="min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>
      <Toaster duration={2000} position="top-center" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ location }) => {
    const publicRoutes = ["/auth", "/setup"];
    if (publicRoutes.includes(location.pathname)) return;

    try {
      const user = await queryClient.fetchQuery(userQueryOptions);
      if (!user?.hasCompletedSetup) {
        throw redirect({
          to: "/setup",
          replace: true,
        });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error("Error fetching user in root route:", error);
      throw redirect({
        to: "/auth",
        search: { tab: "login" },
        replace: true,
      });
    }
  },
});
