import { createFileRoute } from "@tanstack/react-router";
import { MessageCircleHeart } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [
      { title: "AI Legal Assistant — Nyaya Sakhi" },
      {
        name: "description",
        content: "Ask legal questions and get answers from verified Indian Acts with citations.",
      },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ModulePlaceholder
        icon={MessageCircleHeart}
        title="AI Legal Assistant"
        description="Ask your legal question in simple words and receive a plain-language explanation with the Act name, Section number and source document — drawn only from verified law."
        note="Opens in the next build step"
      />
    </div>
  ),
});
