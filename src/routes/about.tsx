import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { PageShell } from "@/components/site-chrome";
import { IG_URL, IG_HANDLE } from "@/lib/menu";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sincere 💖 PlatesbyCere" },
      { name: "description", content: "Meet Sincere — a 16-year-old sophomore at Jesse Bethel in Vallejo, CA, making desserts and food with her friends." },
      { property: "og:title", content: "About Sincere — PlatesbyCere 💖" },
      { property: "og:description", content: "16, Jesse Bethel sophomore, baking with her friends around Vallejo." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-card p-8 text-center shadow-xl ring-1 ring-border sm:p-12">
            <span aria-hidden className="pointer-events-none absolute -right-2 -top-2 select-none text-5xl rotate-12 opacity-70">🎀</span>
            <span aria-hidden className="pointer-events-none absolute -left-2 -bottom-2 select-none text-5xl -rotate-12 opacity-70">🧁</span>

            <p className="text-sm font-semibold uppercase tracking-widest text-primary">About me</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Hello, I'm <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Sincere</span> 💖
            </h1>

            <p className="mx-auto mt-6 max-w-xl font-display text-lg leading-relaxed text-foreground/85 sm:text-xl">
              Hello I'm Sincere, a 16 year old sophomore at Jesse Bethel.
              I make desserts and food with my friends and sell them at school and around Vallejo.
              If you have any questions regarding an order or my pastries, feel free to click my Instagram above 🍓✨
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={IG_URL} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5">
                <Instagram className="h-4 w-4" /> DM @{IG_HANDLE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
