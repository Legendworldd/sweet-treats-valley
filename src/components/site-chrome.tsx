import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { IG_URL, IG_HANDLE } from "@/lib/menu";

export function FoodBackground() {
  const foods = [
    "🧁","🍓","🍪","🎂","🍰","🍩","🍫","🍔","🍤","🧀","🍝","🍭","🍬","🥨","🌈","🍒","🍑","🍉","🍦","✨","🎀","🍇","🍯","🥞",
    "🧁","🍓","🍪","🎂","🍰","🍩","🍫","🍔","🍤","🧀","🍝","🍭","🍬","🥨","🌈","🍒","🍑","🍉","🍦","✨","🎀","🍇","🍯","🥞",
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--rainbow-wash)]" />
      <div className="absolute inset-0 grid grid-cols-6 gap-6 p-4 opacity-[0.18] sm:grid-cols-8 sm:gap-8">
        {foods.map((f, i) => (
          <span key={i} className="select-none text-3xl sm:text-4xl"
            style={{ transform: `rotate(${(i * 37) % 60 - 30}deg) translateY(${(i % 5) * 6}px)` }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
      activeProps={{ className: "rounded-full px-3 py-1.5 text-sm font-semibold bg-primary text-primary-foreground" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b border-border/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="font-display text-lg font-bold text-primary truncate">
          ✨ platesbycere
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/preorder">Pre-Order</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href={IG_URL} target="_blank" rel="noreferrer"
            className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow"
            aria-label={`Instagram @${IG_HANDLE}`}>
            <Instagram className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-12 pt-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-card/70 p-6 text-center shadow-sm ring-1 ring-border backdrop-blur">
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Vallejo, CA</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Pickup only — details on IG</span>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold">
            <Instagram className="h-4 w-4" /> @{IG_HANDLE}
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} PlatesbyCere ✨ Made with 💖 in Vallejo</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      <FoodBackground />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
