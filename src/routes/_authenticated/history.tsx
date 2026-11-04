import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/history")({
  head: () => ({
    meta: [
      { title: "My Queries & History — Nyaya Sakhi" },
      {
        name: "description",
        content: "Your conversations, saved information and drafts — private to your account.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={History}
        title="My Queries & History"
        description="Every conversation, saved item and draft stays private to your account, with options to review or delete them anytime."
        note="Opens in the next build step"
      />
    </div>
  ),
});
