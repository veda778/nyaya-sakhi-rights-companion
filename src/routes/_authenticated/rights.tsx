import { createFileRoute } from "@tanstack/react-router";
import { BookOpenText } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/rights")({
  head: () => ({
    meta: [
      { title: "Know Your Rights — Nyaya Sakhi" },
      {
        name: "description",
        content: "Browse verified Indian Acts and provisions explained in simple language.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={BookOpenText}
        title="Know Your Rights"
        description="A guided library of verified Acts and provisions, each explained in plain language with its source and version shown."
        note="Opens in the next build step"
      />
    </div>
  ),
});
