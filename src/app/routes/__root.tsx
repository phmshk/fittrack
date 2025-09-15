import { Container } from "@/shared/ui/container";
import { Header } from "@/widgets/header/index";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootComponent = () => (
  <>
    <Header />
    <main className="py-x min-h-[calc(100vh-65px)]">
      <Container>
        <Outlet />
      </Container>
    </main>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
});
