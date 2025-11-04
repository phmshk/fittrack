import { createFileRoute } from "@tanstack/react-router";
import { NotepadText } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/_diary/diary")({
  staticData: {
    showHeader: true,
    title: "Diary",
    showBackButton: false,
    isNavRoute: true,
    icon: NotepadText,
    showFooter: true,
  },
});
