import { createFileRoute } from "@tanstack/react-router";
import { FileEdit } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/drafter")({
  head: () => ({
    meta: [
      { title: "Complaint & Application Helper — Nyaya Sakhi" },
      {
        name: "description",
        content: "Draft a complaint or application step by step and download it as a PDF.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={FileEdit}
        title="Complaint & Application Helper"
        description="Choose a document type, fill a guided form, review an editable structured draft and download it as a PDF — you always review before sending."
        note="Opens in the next build step"
      />
    </div>
  ),
});
