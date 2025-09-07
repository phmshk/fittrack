import { Header } from "@/widgets/header/index";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Container } from "@/shared/ui";

const RootComponent = () => (
  <>
    <Header />
    <main className="py-8 min-h-[calc(100vh-65px)]">
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
