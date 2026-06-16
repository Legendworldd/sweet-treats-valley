import { useState } from "react";
import { Check } from "lucide-react";
import { MENU, MENU_BY_NAME, priceFor, IG_URL, IG_HANDLE, type OrderInfo } from "@/lib/menu";

export function PreOrderForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [designs, setDesigns] = useState<Record<string, string>>({});
  const [deposit, setDeposit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<OrderInfo | null>(null);
  const [sending, setSending] = useState(false);
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

  async function confirmOrder() {
    if (!checkout) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkout),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        setError("Hmm, the receipt couldn't send right now. You can still DM @" + IG_HANDLE + " to confirm 💖");
        setSending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network issue sending the receipt. Please DM @" + IG_HANDLE + " to confirm 💖");
    } finally {
      setSending(false);
    }
  }

  if (submitted && checkout) {
    return <ThankYou order={checkout} onReset={() => {
      setSubmitted(false); setCheckout(null); setSelected([]);
      setQuantities({}); setVariants({}); setDesigns({}); setDeposit(false);
    }} />;
  }

  if (checkout) {
    return <Checkout order={checkout} sending={sending} error={error}
      onBack={() => { setCheckout(null); setError(null); }} onConfirm={confirmOrder} />;
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
                            {item.fixedQuantities ? (
                              <select
                                value={quantities[item.name] ?? item.fixedQuantities[0]}
                                onChange={(e) => setQuantities((q) => ({ ...q, [item.name]: parseInt(e.target.value) }))}
                                className="h-9 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                              >
                                {item.fixedQuantities.map((n) => (
                                  <option key={n} value={n}>{n} pieces — ${priceFor(item, n).toFixed(2)}</option>
                                ))}
                              </select>
                            ) : (
                              <>
                                <button type="button" onClick={() => setQuantities((q) => ({ ...q, [item.name]: Math.max(1, (q[item.name] ?? 1) - 1) }))}
                                  className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-lg font-bold hover:bg-secondary/80">−</button>
                                <input type="number" min={1} value={quantities[item.name] ?? 1}
                                  onChange={(e) => setQuantities((q) => ({ ...q, [item.name]: Math.max(1, parseInt(e.target.value) || 1) }))}
                                  className="h-9 w-20 rounded-xl border border-input bg-background px-3 text-center text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                                <button type="button" onClick={() => setQuantities((q) => ({ ...q, [item.name]: (q[item.name] ?? 1) + 1 }))}
                                  className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-lg font-bold hover:bg-secondary/80">+</button>
                              </>
                            )}
                            {item.unitPrice > 0 && (
                              <span className="ml-auto text-sm font-semibold text-primary">
                                ${priceFor(item, quantities[item.name] ?? 1).toFixed(2)}
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

function Checkout({ order, onBack, onConfirm, sending, error }: {
  order: OrderInfo; onBack: () => void; onConfirm: () => void; sending: boolean; error: string | null;
}) {
  const hasDM = order.items.some((i) => i.unitPrice === 0);
  return (
    <section id="preorder" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Checkout 🛍️</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your order summary ✨</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            No payment now! Confirm to lock in your order — Cere will DM you to collect the <span className="font-semibold">$4 deposit</span> and confirm the final total 💖
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
            <Row label="Pay now (deposit via IG DM)" value="$4.00" emphasize />
            <Row label="Pay on pickup day" value={`$${order.remaining.toFixed(2)}${hasDM ? " + DM items" : ""}`} emphasize />
          </div>

          <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-xs text-foreground/80 ring-1 ring-primary/20">
            💌 A cute receipt will be emailed to <span className="font-semibold">{order.email}</span> the moment you confirm. Cere will DM you on Instagram to collect the $4 deposit and confirm the final price.
            <br />Pickup: <span className="font-semibold">{order.pickup}</span> · Vallejo, CA
          </div>

          {error && <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">{error}</p>}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={onBack} disabled={sending} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold hover:bg-secondary/80 disabled:opacity-50 sm:flex-1">
              ← Back to edit
            </button>
            <button onClick={onConfirm} disabled={sending}
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:hover:translate-y-0 sm:flex-[2]">
              {sending ? "Sending receipt… 💌" : "Confirm & Send Receipt 💖"}
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
          A cute receipt was just emailed to <span className="font-semibold">{order.email}</span>.
          Please DM <a href={IG_URL} target="_blank" rel="noreferrer" className="font-semibold text-primary">@{IG_HANDLE}</a> to send your <span className="font-semibold">$4 deposit</span> and confirm your order.
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
