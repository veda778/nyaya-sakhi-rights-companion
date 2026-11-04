import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PhoneCall, Siren, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Helplines — Nyaya Sakhi" },
      {
        name: "description",
        content: "Verified national emergency helplines for women in India — one tap to call.",
      },
    ],
  }),
  component: Emergency,
});

type Contact = {
  id: string;
  name: string;
  purpose: string;
  phone_number: string;
  availability: string | null;
  category: string;
  is_demo: boolean;
  source_reference: string;
};

function Emergency() {
  const contacts = useQuery({
    queryKey: ["emergency-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergency_contacts")
        .select(
          "id, name, purpose, phone_number, availability, category, is_demo, source_reference",
        )
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Contact[];
    },
  });

  const categories = contacts.data
    ? [...new Set(contacts.data.map((c) => c.category))]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl bg-accent p-8 text-accent-foreground">
          <Siren className="h-9 w-9" />
          <h1 className="mt-3 font-display text-4xl">Emergency Help</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed">
            Verified national helplines. This page is kept separate from the chatbot — in an
            emergency, call directly. Tap a number to dial.
          </p>
        </div>

        {contacts.isLoading && (
          <p className="mt-8 text-sm text-muted-foreground">Loading helplines…</p>
        )}
        {contacts.isError && (
          <p className="mt-8 text-sm text-destructive">
            Couldn't load helplines. Please refresh and try again.
          </p>
        )}

        {categories.map((cat) => (
          <section key={cat} className="mt-8">
            <h2 className="font-display text-2xl">{cat}</h2>
            <ul className="mt-3 space-y-3">
              {contacts
                .data!.filter((c) => c.category === cat)
                .map((c) => (
                  <li
                    key={c.id}
                    className="rounded-2xl border border-border/70 bg-card p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{c.name}</h3>
                          {c.is_demo && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                              Demo entry — development data
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{c.purpose}</p>
                        {c.availability && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Available: {c.availability}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground/80">
                          Source: {c.source_reference}
                        </p>
                      </div>
                      <a
                        href={`tel:${c.phone_number.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <PhoneCall className="h-4 w-4" />
                        Call {c.phone_number}
                      </a>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <p className="mt-10 flex items-start gap-2 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-secondary-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Helpline details are stored with their source references and shown above. Nyaya
          Sakhi never invents contact numbers; entries are maintained by administrators from
          official publications.
        </p>
      </main>
    </div>
  );
}
