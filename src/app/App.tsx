import { useSessionStore } from "@/entities/user";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./main";

export function App() {
  const auth = useSessionStore();

  return <RouterProvider router={router} context={{ auth }} />;
}
