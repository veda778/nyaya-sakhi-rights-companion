import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/legal-aid")({
  head: () => ({
    meta: [
      { title: "Legal Aid & Support — Nyaya Sakhi" },
      {
        name: "description",
        content: "Find NALSA and your State or District Legal Services Authority — official contacts only.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={HeartHandshake}
        title="Legal Aid & Support"
        description="Official legal aid contacts and links only — NALSA, State and District Legal Services Authorities. Nyaya Sakhi never invents lawyer details."
        note="Opens in the next build step"
      />
    </div>
  ),
});
