import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Scale,
  MessageCircleHeart,
  BookOpenText,
  Landmark,
  FileEdit,
  HeartHandshake,
  PhoneCall,
  History,
  LogOut,
  ArrowRight,
  Siren,
} from "lucide-react";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Nyaya Sakhi" },
      {
        name: "description",
        content: "Your legal assistant, rights library, schemes explorer, complaint drafter and emergency helplines.",
      },
    ],
  }),
  component: Dashboard,
});

const modules = [
  {
    to: "/chat",
    icon: MessageCircleHeart,
    title: "AI Legal Assistant",
    text: "Ask a legal question, get a simple explanation with Act and Section citations.",
    tint: "secondary" as const,
  },
  {
    to: "/rights",
    icon: BookOpenText,
    title: "Know Your Rights",
    text: "Browse verified Acts and provisions in plain language.",
    tint: "accent" as const,
  },
  {
    to: "/schemes",
    icon: Landmark,
    title: "Government Schemes",
    text: "Explore schemes for women and check your eligibility.",
    tint: "secondary" as const,
  },
  {
    to: "/drafter",
    icon: FileEdit,
    title: "Complaint & Application Helper",
    text: "Draft a complaint or application and download it as a PDF.",
    tint: "accent" as const,
  },
  {
    to: "/legal-aid",
    icon: HeartHandshake,
    title: "Legal Aid & Support",
    text: "NALSA and your State or District Legal Services Authority — official contacts.",
    tint: "secondary" as const,
  },
  {
    to: "/history",
    icon: History,
    title: "My Queries & History",
    text: "Your conversations, saved information and drafts — private to you.",
    tint: "accent" as const,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const sessionUserId = useQuery({
    queryKey: ["session-user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user?.id ?? null;
    },
  });

  const profile = useQuery({
    queryKey: ["profile", sessionUserId.data],
    enabled: !!sessionUserId.data,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, preferred_language")
        .eq("id", sessionUserId.data!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const recentSessions = useQuery({
    queryKey: ["recent-chat-sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const name = profile.data?.display_name || "there";

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Scale className="h-5 w-5" />
            </span>
            <span className="font-display text-xl">Nyaya Sakhi</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/emergency"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80"
            >
              <Siren className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-input bg-card px-4 text-sm font-medium transition-colors hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm font-medium text-muted-foreground">Namaste,</p>
        <h1 className="mt-1 font-display text-4xl sm:text-5xl">{name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          What would you like to do today? Start with the assistant, or use a guide below —
          everything is written in simple language.
        </p>

        {/* Emergency quick strip */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-accent-pink/30 bg-accent p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Siren className="h-6 w-6 shrink-0 text-accent-foreground" />
            <p className="text-sm leading-snug text-accent-foreground">
              <strong>In danger right now?</strong> Call <a href="tel:112" className="font-semibold underline">112</a>{" "}
              (national emergency) or <a href="tel:1091" className="font-semibold underline">1091</a>{" "}
              (women's helpline).
            </p>
          </div>
          <Link
            to="/emergency"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-foreground px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent-foreground/90"
          >
            All helplines
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Module cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  m.tint === "accent"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <m.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-semibold group-hover:text-primary">{m.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </Link>
          ))}
        </div>

        {/* Recent queries */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Recent questions</h2>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              New question
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recentSessions.isLoading ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
          ) : recentSessions.data && recentSessions.data.length > 0 ? (
            <ul className="mt-4 divide-y divide-border/70 rounded-2xl border border-border/70 bg-card">
              {recentSessions.data.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/chat"
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-muted/60"
                  >
                    <span className="truncate text-sm font-medium">{s.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(s.updated_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-2xl border border-dashed border-border bg-muted/40 px-5 py-6 text-sm text-muted-foreground">
              No questions yet. Open the AI Legal Assistant and ask your first question — it
              answers only from verified Indian Acts, with citations.
            </p>
          )}
        </section>

        <p className="mt-10 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-secondary-foreground">
          <strong>Remember:</strong> Nyaya Sakhi provides legal information, not legal advice.
          For advice on your specific case, consult NALSA, your State Legal Services Authority
          or a qualified lawyer. In an emergency, use the helplines above.
        </p>
      </main>
    </div>
  );
}
