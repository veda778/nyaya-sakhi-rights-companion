import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes — Nyaya Sakhi" },
      {
        name: "description",
        content: "Explore government schemes for women and check your eligibility.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={Landmark}
        title="Government Schemes"
        description="Browse curated central and state schemes for women — benefits, eligibility, documents and the official application link, plus an eligibility questionnaire."
        note="Opens in the next build step"
      />
    </div>
  ),
});
