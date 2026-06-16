import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { PreOrderForm } from "@/components/pre-order-form";

export const Route = createFileRoute("/preorder")({
  head: () => ({
    meta: [
      { title: "Pre-Order 🧁 PlatesbyCere — Vallejo, CA" },
      { name: "description", content: "Pre-order homemade sliders, boudin balls, mac n cheese balls, chocolate covered treats, cake cookies & mini cakes from PlatesbyCere. $4 deposit confirms your order." },
      { property: "og:title", content: "Pre-Order from PlatesbyCere 💖" },
      { property: "og:description", content: "Fill out a quick form to lock in your homemade order. Cute email receipt included!" },
    ],
  }),
  component: PreOrderPage,
});

function PreOrderPage() {
  return (
    <PageShell>
      <PreOrderForm />
    </PageShell>
  );
}
