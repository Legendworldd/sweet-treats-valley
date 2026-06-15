import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Instagram, MapPin, Clock, Heart, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlatesbyCere ✨ Vallejo's Beginner Pastry & Snack Maker" },
      {
        name: "description",
        content:
          "Homemade sliders, boudin balls, mac n cheese balls, cheesecake cups, chocolate covered treats & mini cakes by Cere — based in Vallejo, CA. Pre-order today!",
      },
      { property: "og:title", content: "PlatesbyCere ✨ Homemade Happiness in Vallejo" },
      {
        property: "og:description",
        content: "Cute homemade pastries, snacks & dipped treats. Pre-order on Instagram @Platesbycere 💖",
      },
    ],
  }),
  component: Index,
});

const IG_URL = "https://www.instagram.com/whetfmyplate?igsh=M2xmcDUwbndzeXBj&utm_source=qr";
const IG_HANDLE = "Platesbycere";

type MenuItem = {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  unitPrice: number; // base/display unit price
  unitLabel: string; // e.g. "each", "per 6"
  options?: string[];
  designRequired?: boolean;
  fixedQuantities?: number[]; // if set, qty picker is a select limited to these
};

const MENU: MenuItem[] = [
  { emoji: "🍔", name: "Sliders", desc: "Mini burgers, big flavor", price: "$2 each · 4 for $10 · +$2 each after", unitPrice: 2, unitLabel: "each" },
  { emoji: "🍤", name: "Boudin Balls", desc: "Crispy & savory bites", price: "$3 each · 3 for $12 · +$3 each after", unitPrice: 3, unitLabel: "each", options: ["With Hot Cheetos 🔥", "Without (regular)"] },
  { emoji: "🧀", name: "Mac n Cheese Balls", desc: "Regular or Hot Cheetos crusted 🔥", price: "$3 each · 3 for $12 · +$3 each after", unitPrice: 3, unitLabel: "each", options: ["With Hot Cheetos 🔥", "Regular"] },
  { emoji: "🍝", name: "Chicken Alfredo", desc: "With or without shrimp 🍤", price: "$10", unitPrice: 10, unitLabel: "plate", options: ["With Shrimp 🍤", "Without Shrimp"] },
  { emoji: "🍤", name: "Shrimp Pasta", desc: "Creamy & dreamy", price: "$10", unitPrice: 10, unitLabel: "plate" },
  { emoji: "🍰", name: "Cheesecake Cups", desc: "Lil cups of heaven", price: "$6", unitPrice: 6, unitLabel: "cup" },
  { emoji: "🍫", name: "Dubai Chocolate Cups", desc: "Pistachio + kataifi 😍 viral fave", price: "DM for price 💌", unitPrice: 0, unitLabel: "cup" },
  { emoji: "🍓", name: "Chocolate Covered Strawberries", desc: "Dipped with love", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🍪", name: "Chocolate Covered Oreos", desc: "Custom designs available", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🥨", name: "Chocolate Covered Pretzels", desc: "Sweet + salty perfection", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🍪", name: "Cake Cookies", desc: "Soft, thick & dreamy", price: "$2 each · 4 for $5 · +$2 each after", unitPrice: 2, unitLabel: "each", designRequired: true },
  { emoji: "🎂", name: "Mini Cakes", desc: "Custom designs on request", price: "$8 each", unitPrice: 8, unitLabel: "each", designRequired: true },
  { emoji: "🍭", name: "More Dipped Treats", desc: "Just ask — I got you!", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
];

const MENU_BY_NAME: Record<string, MenuItem> = Object.fromEntries(MENU.map((m) => [m.name, m]));

function priceFor(item: MenuItem, qty: number): number {
  if (qty <= 0) return 0;
  switch (item.name) {
    case "Sliders":
      // $2 each up to 3, 4 = $10, then +$2 per extra
      if (qty < 4) return qty * 2;
      return 10 + (qty - 4) * 2;
    case "Boudin Balls":
    case "Mac n Cheese Balls":
      // $3 each up to 2, 3 = $12, then +$3 per extra
      if (qty < 3) return qty * 3;
      return 12 + (qty - 3) * 3;
    case "Cake Cookies":
      // $2 each up to 3, 4 = $5, then +$2 per extra
      if (qty < 4) return qty * 2;
      return 5 + (qty - 4) * 2;
    case "Chocolate Covered Strawberries":
    case "Chocolate Covered Oreos":
    case "Chocolate Covered Pretzels":
    case "More Dipped Treats":
      // Only 6 or 12 allowed
      return qty >= 12 ? 12 : 8;
    default:
      return item.unitPrice * qty;
  }
}

function Index() {
  return (
    <div className="relative min-h-screen text-foreground">
      <FoodBackground />
      <div className="relative">
        <Hero />
        <About />
        <Menu />
        <PreOrderForm />
        <Socials />
        <Footer />
      </div>
    </div>
  );
}

function FoodBackground() {
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

function FloatingEmoji({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span aria-hidden className={`pointer-events-none absolute select-none opacity-70 ${className}`}>{children}</span>;
}

function Hero() {
  return (
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
          <a href="#preorder" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
            Pre-Order Now <Heart className="h-4 w-4 fill-current transition-transform group-hover:scale-125" />
          </a>
          <a href="#menu" className="inline-flex items-center justify-center rounded-full bg-card px-8 py-3.5 text-base font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-secondary">
            See the Menu 🍪
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl bg-card p-7 shadow-xl ring-1 ring-border sm:p-10">
          <FloatingEmoji className="-right-2 -top-2 text-5xl rotate-12">🎀</FloatingEmoji>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About me</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Hi, I'm Cere! 👋</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            I'm a high schooler at <span className="font-semibold">Jesse M. Bethel</span> in Vallejo, CA, and I love
            making delicious treats! I make <span className="font-semibold">sliders</span>, boudin balls, mac n cheese
            balls (hot cheetos or regular), chicken alfredo with/without shrimp, shrimp pasta, cheesecake cups, Dubai
            chocolate cups, chocolate covered strawberries / oreos / pretzels, cake cookies, mini cakes and more dipped
            treats. 🍓🧁🍪
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            Every plate is made with love — let me bring a little homemade happiness to your day! 💖
          </p>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section id="menu" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The menu</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Pick your faves 🍰</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Everything is made fresh to order. Prices below — tap an item to pre-order!
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item) => (
            <div key={item.name} className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">{item.emoji}</div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold">{item.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type OrderInfo = {
  name: string;
  email: string;
  contact: string;
  pickup: string;
  details: string;
  items: Array<{ name: string; emoji: string; qty: number; variant?: string; design?: string; unitPrice: number; unitLabel: string; lineTotal: number }>;
  subtotal: number;
  depositCredit: number;
  remaining: number;
};

function PreOrderForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [designs, setDesigns] = useState<Record<string, string>>({});
  const [deposit, setDeposit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<OrderInfo | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (item: string) => {
    setSelected((s) => {
      if (s.includes(item)) {
        const next = s.filter((i) => i !== item);
        setQuantities((q) => { const n = { ...q }; delete n[item]; return n; });
        return next;
      }
      const def = MENU_BY_NAME[item].fixedQuantities?.[0] ?? 1;
      setQuantities((q) => ({ ...q, [item]: q[item] ?? def }));
      return [...s, item];
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!deposit) return;
    if (selected.length === 0) { setError("Please pick at least one item 💕"); return; }

    for (const name of selected) {
      const it = MENU_BY_NAME[name];
      if (it.options && !variants[name]) { setError(`Please pick an option for ${name}.`); return; }
      if (it.designRequired && !(designs[name] && designs[name].trim().length > 0)) {
        setError(`Please add a design reference or description for ${name}.`); return;
      }
      if (!quantities[name] || quantities[name] < 1) { setError(`Please set a quantity for ${name}.`); return; }
    }

    const data = new FormData(e.currentTarget);
    const items = selected.map((n) => {
      const it = MENU_BY_NAME[n];
      const qty = quantities[n] ?? 1;
      return {
        name: n, emoji: it.emoji, qty,
        variant: variants[n], design: designs[n],
        unitPrice: it.unitPrice, unitLabel: it.unitLabel,
        lineTotal: priceFor(it, qty),
      };
    });
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const depositCredit = 3;
    const remaining = Math.max(0, subtotal - depositCredit);

    setCheckout({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      contact: String(data.get("contact") ?? ""),
      pickup: String(data.get("pickup") ?? ""),
      details: String(data.get("details") ?? ""),
      items, subtotal, depositCredit, remaining,
    });
  };

  if (submitted && checkout) {
    return <ThankYou order={checkout} onReset={() => {
      setSubmitted(false); setCheckout(null); setSelected([]);
      setQuantities({}); setVariants({}); setDesigns({}); setDeposit(false);
    }} />;
  }

  if (checkout) {
    return <Checkout order={checkout} onBack={() => setCheckout(null)} onConfirm={() => {
      sendReceiptEmail(checkout);
      window.open(IG_URL, "_blank");
      setSubmitted(true);
    }} />;
  }

  return (
    <section id="preorder" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pre-order form</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Let's make your order 🧁</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Fill out the details below — you'll see your total on the next step.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
          <Field label="Your name 💕" name="name" placeholder="Cere's bestie" required />
          <Field label="Email (for your cute receipt 💌)" name="email" type="email" placeholder="you@email.com" required />
          <Field label="Contact (IG handle or phone)" name="contact" placeholder="@yourhandle or 707-..." required />
          <Field label="Pickup date" name="pickup" type="date" required />

          <div>
            <label className="text-sm font-semibold">Pick your items 🍓</label>
            <p className="text-xs text-muted-foreground">Tap to add. Pick options, design, and quantity per item.</p>
            <div className="mt-3 space-y-2">
              {MENU.map((item) => {
                const checked = selected.includes(item.name);
                return (
                  <div key={item.name} className={`rounded-2xl ring-1 transition-colors ${checked ? "bg-primary/10 ring-primary" : "bg-background ring-border"}`}>
                    <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm">
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ring-1 ${checked ? "bg-primary text-primary-foreground ring-primary" : "bg-card ring-border"}`}>
                        {checked && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-lg">{item.emoji}</span>
                      <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.price}</span>
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(item.name)} />
                    </label>

                    {checked && (
                      <div className="space-y-3 border-t border-border/60 p-3 animate-in fade-in slide-in-from-top-1">
                        {item.options && (
                          <div>
                            <label className="text-xs font-semibold text-foreground/80">Choose an option <span className="text-primary">*</span></label>
                            <select required value={variants[item.name] ?? ""}
                              onChange={(e) => setVariants((v) => ({ ...v, [item.name]: e.target.value }))}
                              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30">
                              <option value="" disabled>Select an option…</option>
                              {item.options.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        )}
                        {item.designRequired && (
                          <div>
                            <label className="text-xs font-semibold text-foreground/80">Design reference or description <span className="text-primary">*</span></label>
                            <textarea required rows={2} value={designs[item.name] ?? ""}
                              onChange={(e) => setDesigns((d) => ({ ...d, [item.name]: e.target.value }))}
                              placeholder="Paste a link to a pic OR describe the design"
                              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                            <p className="mt-1 text-[11px] text-muted-foreground">You can also DM the photo to @{IG_HANDLE} after submitting.</p>
                          </div>
                        )}
                        <div>
                          <label className="text-xs font-semibold text-foreground/80">Quantity ({item.unitLabel}) <span className="text-primary">*</span></label>
                          <div className="mt-1 flex items-center gap-2">
                            <button type="button" onClick={() => setQuantities((q) => ({ ...q, [item.name]: Math.max(1, (q[item.name] ?? 1) - 1) }))}
                              className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-lg font-bold hover:bg-secondary/80">−</button>
                            <input type="number" min={1} value={quantities[item.name] ?? 1}
                              onChange={(e) => setQuantities((q) => ({ ...q, [item.name]: Math.max(1, parseInt(e.target.value) || 1) }))}
                              className="h-9 w-20 rounded-xl border border-input bg-background px-3 text-center text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                            <button type="button" onClick={() => setQuantities((q) => ({ ...q, [item.name]: (q[item.name] ?? 1) + 1 }))}
                              className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-lg font-bold hover:bg-secondary/80">+</button>
                            {item.unitPrice > 0 && (
                              <span className="ml-auto text-sm font-semibold text-primary">
                                ${(item.unitPrice * (quantities[item.name] ?? 1)).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <TextArea label="Anything else? (allergies, flavors, notes) 🎀" name="details" placeholder="Allergies, flavors, color palette, theme..." />

          <label className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-4 text-sm ring-1 ring-border">
            <input type="checkbox" checked={deposit} onChange={(e) => setDeposit(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--primary)]" required />
            <span>
              I agree to the <span className="font-bold">$4 non-refundable deposit</span> to confirm my order.
              <span className="block text-xs text-muted-foreground mt-1">$3 of it goes toward my order — I pay the remaining balance on pickup day. 💖</span>
            </span>
          </label>

          {error && <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">{error}</p>}

          <button type="submit" disabled={!deposit || selected.length === 0}
            className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
            Submit Pre-Order 🧁
          </button>
        </form>
      </div>
    </section>
  );
}

function Checkout({ order, onBack, onConfirm }: { order: OrderInfo; onBack: () => void; onConfirm: () => void }) {
  const hasDM = order.items.some((i) => i.unitPrice === 0);
  return (
    <section id="preorder" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Checkout 🛍️</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your order summary ✨</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            No payment now! Just confirm to pay your <span className="font-semibold">$4 deposit</span>. Remaining balance is due on pickup day 💖
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
          <div className="space-y-3">
            {order.items.map((it) => (
              <div key={it.name} className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-3">
                <span className="text-2xl">{it.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{it.name} <span className="text-muted-foreground font-normal">× {it.qty}</span></p>
                  {it.variant && <p className="text-xs text-muted-foreground">{it.variant}</p>}
                  {it.design && <p className="text-xs text-muted-foreground truncate">🎨 {it.design}</p>}
                </div>
                <p className="font-semibold text-primary whitespace-nowrap">
                  {it.unitPrice === 0 ? "DM price" : `$${it.lineTotal.toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <Row label="Subtotal" value={`$${order.subtotal.toFixed(2)}${hasDM ? " +DM items" : ""}`} />
            <Row label="Deposit credit (−$3 toward order)" value={`−$${order.depositCredit.toFixed(2)}`} />
            <div className="my-2 border-t border-dashed border-border" />
            <Row label="Pay now (deposit)" value="$4.00" emphasize />
            <Row label="Pay on pickup day" value={`$${order.remaining.toFixed(2)}${hasDM ? " + DM items" : ""}`} emphasize />
          </div>

          <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-xs text-foreground/80 ring-1 ring-primary/20">
            💌 We'll email a cute receipt to <span className="font-semibold">{order.email}</span> confirming your $4 deposit ($3 toward order) and the remaining balance.
            <br />Pickup: <span className="font-semibold">{order.pickup}</span> · Vallejo, CA
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={onBack} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold hover:bg-secondary/80 sm:flex-1">
              ← Back to edit
            </button>
            <button onClick={onConfirm} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform sm:flex-[2]">
              Continue & Send Deposit 💖
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${emphasize ? "text-base font-bold" : "text-muted-foreground"}`}>
      <span>{label}</span><span className={emphasize ? "text-primary" : ""}>{value}</span>
    </div>
  );
}

function ThankYou({ order, onReset }: { order: OrderInfo; onReset: () => void }) {
  return (
    <section id="preorder" className="px-5 py-16">
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-3xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold">Yay! Thank you, {order.name.split(" ")[0] || "lovely"}! 💖</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A cute receipt is on its way to <span className="font-semibold">{order.email}</span>. Please DM <span className="font-semibold">@{IG_HANDLE}</span> to send your <span className="font-semibold">$4 deposit</span> and confirm your order.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Remaining balance: <span className="font-bold text-primary">${order.remaining.toFixed(2)}</span> — due on pickup day ({order.pickup}).
        </p>
        <button onClick={onReset} className="mt-6 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold hover:bg-secondary/80">
          Place another order
        </button>
      </div>
    </section>
  );
}

function sendReceiptEmail(order: OrderInfo) {
  const itemLines = order.items.map((i) =>
    `• ${i.emoji} ${i.name} × ${i.qty}${i.variant ? ` (${i.variant})` : ""} — ${i.unitPrice === 0 ? "DM for price" : `$${i.lineTotal.toFixed(2)}`}`
  ).join("%0A");
  const subject = encodeURIComponent("✨ Your PlatesbyCere Pre-Order Receipt 💖");
  const body =
    `Hi ${order.name}! 💕%0A%0A` +
    `Thank you for pre-ordering with PlatesbyCere! Here's your cutie receipt:%0A%0A` +
    `🧁 ORDER:%0A${itemLines}%0A%0A` +
    `💰 SUBTOTAL: $${order.subtotal.toFixed(2)}%0A` +
    `💖 Deposit paid: $4.00 (non-refundable)%0A` +
    `✨ Deposit credit toward order: -$3.00%0A` +
    `🎀 REMAINING BALANCE (due on pickup day): $${order.remaining.toFixed(2)}%0A%0A` +
    `📅 Pickup date: ${order.pickup}%0A📍 Vallejo, CA%0A%0A` +
    `Please DM @${IG_HANDLE} on Instagram to send your $4 deposit and confirm 💌%0A%0A` +
    `xoxo, Cere ✨🍓`;
  window.location.href = `mailto:${encodeURIComponent(order.email)}?subject=${subject}&body=${body}`;
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} {...rest}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

function TextArea({ label, name, ...rest }: { label: string; name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <textarea id={name} name={name} rows={3} {...rest}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

function Socials() {
  return (
    <section className="px-5 py-12">
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
  );
}

function Footer() {
  return (
    <footer className="px-5 pb-12 pt-4">
      <div className="mx-auto max-w-3xl rounded-3xl bg-card/70 p-6 text-center shadow-sm ring-1 ring-border backdrop-blur">
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Vallejo, CA</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Pickup only — details on IG</span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} PlatesbyCere ✨ Made with 💖 in Vallejo</p>
      </div>
    </footer>
  );
}
