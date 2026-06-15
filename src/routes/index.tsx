import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
        content: "Cute homemade pastries, snacks & dipped treats. Pre-order on Instagram @whetfmyplate 💖",
      },
    ],
  }),
  component: Index,
});

type MenuItem = {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  options?: string[]; // dropdown choices
  designRequired?: boolean; // requires a design reference/description
};

const MENU: MenuItem[] = [
  { emoji: "🍔", name: "Sliders", desc: "Mini burgers, big flavor", price: "$2 each · $10–$11 for 4" },
  {
    emoji: "🍤",
    name: "Boudin Balls",
    desc: "Crispy & savory bites",
    price: "$3 each · $12 for 3",
    options: ["With Hot Cheetos 🔥", "Without (regular)"],
  },
  {
    emoji: "🧀",
    name: "Mac n Cheese Balls",
    desc: "Regular or Hot Cheetos crusted 🔥",
    price: "$3 each · $12 for 3",
    options: ["With Hot Cheetos 🔥", "Regular"],
  },
  {
    emoji: "🍝",
    name: "Chicken Alfredo",
    desc: "With or without shrimp 🍤",
    price: "$10",
    options: ["With Shrimp 🍤", "Without Shrimp"],
  },
  { emoji: "🍤", name: "Shrimp Pasta", desc: "Creamy & dreamy", price: "$10" },
  { emoji: "🍰", name: "Cheesecake Cups", desc: "Lil cups of heaven", price: "$6" },
  { emoji: "🍫", name: "Dubai Chocolate Cups", desc: "Pistachio + kataifi 😍 viral fave", price: "DM for price 💌" },
  { emoji: "🍓", name: "Chocolate Covered Strawberries", desc: "Dipped with love", price: "$8 for 6 · $12 for a dozen", designRequired: true },
  { emoji: "🍪", name: "Chocolate Covered Oreos", desc: "Custom designs available", price: "$8 for 6 · $12 for a dozen", designRequired: true },
  { emoji: "🥨", name: "Chocolate Covered Pretzels", desc: "Sweet + salty perfection", price: "$8 for 6 · $12 for a dozen", designRequired: true },
  { emoji: "🍪", name: "Cake Cookies", desc: "Soft, thick & dreamy", price: "$2 each · $5 for 4", designRequired: true },
  { emoji: "🎂", name: "Mini Cakes", desc: "Custom designs on request", price: "$8 each", designRequired: true },
  { emoji: "🍭", name: "More Dipped Treats", desc: "Just ask — I got you!", price: "$8 for 6 · $12 for a dozen", designRequired: true },
];

const MENU_BY_NAME: Record<string, MenuItem> = Object.fromEntries(MENU.map((m) => [m.name, m]));

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

// Rainbow-tinted scattered food emoji background
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
          <span
            key={i}
            className="select-none text-3xl sm:text-4xl"
            style={{
              transform: `rotate(${(i * 37) % 60 - 30}deg) translateY(${(i % 5) * 6}px)`,
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingEmoji({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute select-none opacity-70 ${className}`}>
      {children}
    </span>
  );
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
          <a
            href="#preorder"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            Pre-Order Now <Heart className="h-4 w-4 fill-current transition-transform group-hover:scale-125" />
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full bg-card px-8 py-3.5 text-base font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-secondary"
          >
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
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">
                  {item.emoji}
                </div>
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

function PreOrderForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [designs, setDesigns] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (item: string) =>
    setSelected((s) => (s.includes(item) ? s.filter((i) => i !== item) : [...s, item]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!deposit) return;

    // Validate: each selected item with options must have a variant
    for (const name of selected) {
      const it = MENU_BY_NAME[name];
      if (it.options && !variants[name]) {
        setError(`Please pick an option for ${name}.`);
        return;
      }
      if (it.designRequired && !(designs[name] && designs[name].trim().length > 0)) {
        setError(`Please add a design reference or description for ${name}.`);
        return;
      }
    }

    const data = new FormData(e.currentTarget);
    const itemsLines = selected
      .map((n) => {
        const parts = [n];
        if (variants[n]) parts.push(`(${variants[n]})`);
        if (designs[n]) parts.push(`— design: ${designs[n]}`);
        return `- ${parts.join(" ")}`;
      })
      .join("%0A");

    const text =
      `Hi Cere! 💖 I'd like to pre-order:%0A%0A` +
      `Name: ${data.get("name")}%0AContact: ${data.get("contact")}%0APickup: ${data.get("pickup")}%0A` +
      `Qty: ${data.get("quantity")}%0A%0AItems:%0A${itemsLines}%0A%0ANotes: ${data.get("details") ?? ""}`;
    window.open(`https://www.instagram.com/whetfmyplate?igsh=M2xmcDUwbndzeXBj&utm_source=qr`, "_blank");
    window.location.href = `mailto:?subject=PlatesbyCere Pre-Order&body=${text}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="preorder" className="px-5 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-3xl">🎉</div>
          <h2 className="mt-4 text-2xl font-bold">Thank you, sweet thing!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your order request was prepared. Please also DM <span className="font-semibold">@whetfmyplate</span> on
            Instagram to confirm and send your $4 deposit. 💖
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelected([]);
              setVariants({});
              setDesigns({});
              setDeposit(false);
            }}
            className="mt-6 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold hover:bg-secondary/80"
          >
            Place another order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="preorder" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pre-order form</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Let's make your order 🧁</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Fill out the details below and I'll confirm your order on Instagram.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-5 rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8"
        >
          <Field label="Your name 💕" name="name" placeholder="Cere's bestie" required />
          <Field
            label="Contact (IG handle, phone or email)"
            name="contact"
            placeholder="@yourhandle or 707-..."
            required
          />
          <Field label="Pickup date" name="pickup" type="date" required />

          <div>
            <label className="text-sm font-semibold">Pick your items 🍓</label>
            <p className="text-xs text-muted-foreground">Tap to add. Some items need an option or design.</p>
            <div className="mt-3 space-y-2">
              {MENU.map((item) => {
                const checked = selected.includes(item.name);
                return (
                  <div
                    key={item.name}
                    className={`rounded-2xl ring-1 transition-colors ${
                      checked ? "bg-primary/10 ring-primary" : "bg-background ring-border"
                    }`}
                  >
                    <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm">
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ring-1 ${
                          checked ? "bg-primary text-primary-foreground ring-primary" : "bg-card ring-border"
                        }`}
                      >
                        {checked && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-lg">{item.emoji}</span>
                      <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggle(item.name)}
                      />
                    </label>

                    {checked && (item.options || item.designRequired) && (
                      <div className="space-y-3 border-t border-border/60 p-3">
                        {item.options && (
                          <div>
                            <label className="text-xs font-semibold text-foreground/80">
                              Choose an option <span className="text-primary">*</span>
                            </label>
                            <select
                              required
                              value={variants[item.name] ?? ""}
                              onChange={(e) =>
                                setVariants((v) => ({ ...v, [item.name]: e.target.value }))
                              }
                              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                            >
                              <option value="" disabled>
                                Select an option…
                              </option>
                              {item.options.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {item.designRequired && (
                          <div>
                            <label className="text-xs font-semibold text-foreground/80">
                              Design reference or description <span className="text-primary">*</span>
                            </label>
                            <textarea
                              required
                              rows={2}
                              value={designs[item.name] ?? ""}
                              onChange={(e) =>
                                setDesigns((d) => ({ ...d, [item.name]: e.target.value }))
                              }
                              placeholder="Paste a link to a pic OR describe the design (colors, theme, name, etc.)"
                              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                            />
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              You can also DM the photo to @whetfmyplate after submitting.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Field
            label="Total quantity"
            name="quantity"
            type="number"
            min={1}
            defaultValue={1}
            placeholder="How many?"
            required
          />

          <TextArea
            label="Anything else? (allergies, flavors, notes) 🎀"
            name="details"
            placeholder="Allergies, flavors, color palette, theme..."
          />

          <label className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-4 text-sm ring-1 ring-border">
            <input
              type="checkbox"
              checked={deposit}
              onChange={(e) => setDeposit(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--primary)]"
              required
            />
            <span>
              I understand a <span className="font-bold">$4 non-refundable deposit</span> is required to confirm
              my order. 💖
            </span>
          </label>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!deposit || selected.length === 0}
            className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Submit Pre-Order 🧁
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        {...rest}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function Socials() {
  return (
    <section className="px-5 py-12">
      <div className="mx-auto max-w-xl">
        <a
          href="https://www.instagram.com/whetfmyplate?igsh=M2xmcDUwbndzeXBj&utm_source=qr"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-xl transition-transform hover:-translate-y-1"
        >
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30">
            <Instagram className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold">@whetfmyplate</p>
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
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Vallejo, CA
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Pickup only — details on IG
          </span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} PlatesbyCere ✨ Made with 💖 in Vallejo
        </p>
      </div>
    </footer>
  );
}
