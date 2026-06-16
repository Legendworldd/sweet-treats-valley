import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Instagram } from "lucide-react";
import { PageShell } from "@/components/site-chrome";
import { IG_URL, IG_HANDLE } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlatesbyCere ✨ Vallejo's Beginner Pastry & Snack Maker" },
      { name: "description", content: "Homemade sliders, boudin balls, mac n cheese balls, cheesecake cups, chocolate covered treats & mini cakes by Cere — based in Vallejo, CA. Pre-order today!" },
      { property: "og:title", content: "PlatesbyCere ✨ Homemade Happiness in Vallejo" },
      { property: "og:description", content: "Cute homemade pastries, snacks & dipped treats. Pre-order on Instagram @Platesbycere 💖" },
    ],
  }),
  component: Home,
});

function FloatingEmoji({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span aria-hidden className={`pointer-events-none absolute select-none opacity-70 ${className}`}>{children}</span>;
}

function Home() {
  return (
    <PageShell>
      <section className="relative overflow-hidden px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <FloatingEmoji className="left-4 top-6 text-3xl animate-bounce [animation-duration:3s]">🧁</FloatingEmoji>
        <FloatingEmoji className="right-6 top-10 text-3xl animate-bounce [animation-duration:4s]">🍓</FloatingEmoji>
        <FloatingEmoji className="left-8 bottom-4 text-2xl animate-bounce [animation-duration:5s]">🍪</FloatingEmoji>
        <FloatingEmoji className="right-10 bottom-10 text-2xl animate-bounce [animation-duration:3.5s]">🎂</FloatingEmoji>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur ring-1 ring-border">
            <Sparkles className="h-3.5 w-3.5" /> Now taking pre-orders
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            <span className="text-primary">✨ platesby</span>
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">cere</span>
            <span className="text-primary"> ✨</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Vallejo's beginner pastry & snack maker <span className="text-primary">💖</span> Homemade happiness, made just for you!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/preorder" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              Pre-Order Now <Heart className="h-4 w-4 fill-current transition-transform group-hover:scale-125" />
            </Link>
            <Link to="/menu" className="inline-flex items-center justify-center rounded-full bg-card px-8 py-3.5 text-base font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-secondary">
              See the Menu 🍪
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { e: "📖", t: "Menu", d: "Browse all the cuteness", to: "/menu" as const },
            { e: "🧁", t: "Pre-Order", d: "Easy form, cute receipt", to: "/preorder" as const },
            { e: "💖", t: "About Me", d: "Meet Sincere", to: "/about" as const },
          ].map((c) => (
            <Link key={c.t} to={c.to} className="group rounded-3xl bg-card p-5 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40">
              <div className="text-3xl">{c.e}</div>
              <p className="mt-2 font-bold">{c.t}</p>
              <p className="text-xs text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto max-w-xl">
          <a href={IG_URL} target="_blank" rel="noreferrer"
            className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-xl transition-transform hover:-translate-y-1">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30">
              <Instagram className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-bold">@{IG_HANDLE}</p>
              <p className="text-sm opacity-90">Pre-order on IG too! 💌</p>
            </div>
            <span className="hidden text-2xl sm:inline">✨</span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
