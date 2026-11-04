import { createFileRoute } from "@tanstack/react-router";
import { MessageCircleHeart } from "lucide-react";

interface ModulePlaceholderProps {
  icon: typeof MessageCircleHeart;
  title: string;
  description: string;
  note: string;
}

/** Friendly empty state for modules whose screens arrive in the next build step. */
export function ModulePlaceholder({ icon: Icon, title, description, note }: ModulePlaceholderProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-border/70 bg-card px-8 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <Icon className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-3xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <p className="mt-6 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
        {note}
      </p>
    </div>
  );
}
