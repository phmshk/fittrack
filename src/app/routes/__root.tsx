import type { useSessionStore } from "@/entities/user/model/useSession";
import { Header } from "@/widgets/header";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  isRedirect,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { userQueryOptions } from "@/entities/user";
import { queryClient } from "../providers/queryClient";
import { Footer } from "@/widgets/footer";
import { useBreakpoint } from "@/shared/lib";

interface RouterContext {
  auth: ReturnType<typeof useSessionStore.getState>;
}

const RootComponent = () => {
  const isMobile = useBreakpoint();
  const matches = useMatches();
  const currentPage = matches.at(-1);

  const showHeader = currentPage?.staticData.showHeader;
  const showFooter = currentPage?.staticData.showFooter;
  const showBackButton = currentPage?.staticData.showBackButton;
  const title = showBackButton ? currentPage?.staticData.title : "";

  return (
    <>
      {showHeader && (
        <Header
          title={title}
          showBackButton={showBackButton}
          isMobile={isMobile}
        />
      )}
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer isMobile={isMobile} />}
      <Toaster duration={2000} position="top-center" />
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
  staticData: {
    showHeader: false,
    title: "",
    showBackButton: false,
    isNavRoute: false,
    showFooter: false,
  },
});
