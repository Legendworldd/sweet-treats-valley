import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { MenuList } from "@/components/menu-list";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu 🍰 PlatesbyCere — Vallejo, CA" },
      { name: "description", content: "Sliders, boudin balls, mac n cheese balls, cheesecake cups, chocolate-covered strawberries / oreos / pretzels, cake cookies, mini cakes & more — all made fresh by Cere in Vallejo." },
      { property: "og:title", content: "PlatesbyCere Menu 🍰" },
      { property: "og:description", content: "All the cute homemade snacks & pastries — see prices and pre-order!" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <PageShell>
      <section className="px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">The menu</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Pick your faves 🍰</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Everything is made fresh to order. Prices below — head to pre-order when you're ready!
            </p>
          </div>
          <div className="mt-10"><MenuList /></div>
          <div className="mt-10 text-center">
            <Link to="/preorder" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform">
              Place a Pre-Order 🧁
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
