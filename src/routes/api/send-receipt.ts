import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const OrderItemSchema = z.object({
  name: z.string().max(100),
  emoji: z.string().max(8),
  qty: z.number().int().min(1).max(500),
  variant: z.string().max(100).optional(),
  design: z.string().max(2000).optional(),
  unitPrice: z.number(),
  unitLabel: z.string().max(40),
  lineTotal: z.number(),
});

const OrderSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  contact: z.string().trim().min(1).max(120),
  pickup: z.string().trim().min(1).max(40),
  details: z.string().max(2000).optional().default(""),
  items: z.array(OrderItemSchema).min(1).max(30),
  subtotal: z.number(),
  depositCredit: z.number(),
  remaining: z.number(),
});

const OWNER_EMAIL = "Platesbycere@gmail.com";
const IG_HANDLE = "Platesbycere";
const IG_URL = "https://www.instagram.com/whetfmyplate?igsh=M2xmcDUwbndzeXBj&utm_source=qr";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function buildEmail(order: z.infer<typeof OrderSchema>, forOwner: boolean) {
  const itemRows = order.items.map((i) => {
    const variant = i.variant ? `<div style="font-size:12px;color:#a37892;">${escapeHtml(i.variant)}</div>` : "";
    const design = i.design ? `<div style="font-size:12px;color:#a37892;">🎨 ${escapeHtml(i.design)}</div>` : "";
    const price = i.unitPrice === 0 ? "DM for price" : `$${i.lineTotal.toFixed(2)}`;
    return `
      <tr>
        <td style="padding:10px 14px;background:#fff5fa;border-radius:14px;">
          <div style="font-weight:700;color:#7a3a59;">${i.emoji} ${escapeHtml(i.name)} <span style="color:#b97a99;font-weight:500;">× ${i.qty}</span></div>
          ${variant}${design}
        </td>
        <td style="padding:10px 14px;background:#fff5fa;border-radius:14px;text-align:right;font-weight:700;color:#d63384;white-space:nowrap;">${price}</td>
      </tr>
      <tr><td colspan="2" style="height:6px;"></td></tr>
    `;
  }).join("");

  const heading = forOwner
    ? `🎀 New pre-order from ${escapeHtml(order.name)}!`
    : `✨ Thank you, ${escapeHtml(order.name.split(" ")[0] || "lovely")}! 💖`;

  const intro = forOwner
    ? `You got a new pre-order — DM <b>${escapeHtml(order.contact)}</b> to confirm details & final price 💌`
    : `Your pre-order is in! Here's your cutie receipt 🧁<br/>I'll DM you on Instagram soon to confirm your total and details 💌`;

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fff0f6;font-family:'Quicksand',Arial,sans-serif;color:#4a2238;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff0f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:28px;box-shadow:0 8px 30px rgba(214,51,132,0.12);">
        <tr><td align="center" style="padding-bottom:8px;font-size:26px;">🧁  🍪  💖  🍓  🎂</td></tr>
        <tr><td align="center" style="font-size:13px;font-weight:700;letter-spacing:2px;color:#d63384;text-transform:uppercase;">PlatesbyCere</td></tr>
        <tr><td align="center" style="padding:4px 0 16px;font-size:22px;font-weight:800;color:#7a3a59;">${heading}</td></tr>
        <tr><td style="font-size:14px;line-height:1.6;color:#5a2f47;padding-bottom:18px;text-align:center;">${intro}</td></tr>

        <tr><td>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8fb;border-radius:18px;padding:14px;">
            <tr>
              <td style="font-size:12px;color:#a37892;"><b>👤 Name</b><br/>${escapeHtml(order.name)}</td>
              <td style="font-size:12px;color:#a37892;"><b>📞 Contact</b><br/>${escapeHtml(order.contact)}</td>
            </tr>
            <tr><td colspan="2" style="height:8px;"></td></tr>
            <tr>
              <td style="font-size:12px;color:#a37892;"><b>📅 Pickup date</b><br/>${escapeHtml(order.pickup)}</td>
              <td style="font-size:12px;color:#a37892;"><b>📍 Location</b><br/>Vallejo, CA</td>
            </tr>
            ${order.details ? `<tr><td colspan="2" style="padding-top:10px;font-size:12px;color:#a37892;"><b>🎀 Notes</b><br/>${escapeHtml(order.details)}</td></tr>` : ""}
          </table>
        </td></tr>

        <tr><td style="padding:18px 0 8px;font-weight:800;color:#7a3a59;">🧁 Your order</td></tr>
        <tr><td><table width="100%" cellpadding="0" cellspacing="0">${itemRows}</table></td></tr>

        <tr><td style="padding-top:10px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#ffe0ee,#ffd6e8);border-radius:18px;padding:16px;">
            <tr><td style="font-size:13px;color:#7a3a59;">Subtotal</td><td style="text-align:right;font-weight:700;color:#7a3a59;">$${order.subtotal.toFixed(2)}</td></tr>
            <tr><td style="font-size:13px;color:#7a3a59;">Deposit credit (toward order)</td><td style="text-align:right;font-weight:700;color:#7a3a59;">−$${order.depositCredit.toFixed(2)}</td></tr>
            <tr><td colspan="2" style="border-top:1px dashed #f0a8c8;height:1px;padding-top:8px;"></td></tr>
            <tr><td style="font-size:14px;font-weight:800;color:#d63384;">💖 Deposit (pay via IG DM)</td><td style="text-align:right;font-size:14px;font-weight:800;color:#d63384;">$4.00</td></tr>
            <tr><td style="font-size:14px;font-weight:800;color:#d63384;">🎀 Remaining (due on pickup day)</td><td style="text-align:right;font-size:14px;font-weight:800;color:#d63384;">$${order.remaining.toFixed(2)}</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-top:18px;font-size:13px;line-height:1.6;color:#5a2f47;text-align:center;">
          ${forOwner ? "" : `📩 Cere will DM you on Instagram <a href="${IG_URL}" style="color:#d63384;font-weight:700;text-decoration:none;">@${IG_HANDLE}</a> to confirm the <b>final total</b> & all the cute details!<br/><br/><b>Your $4 deposit is non-refundable</b> — $3 of it goes toward your order, and you pay the remaining balance on pickup day 💖`}
        </td></tr>

        <tr><td align="center" style="padding-top:22px;font-size:12px;color:#a37892;">xoxo, Cere ✨🍓<br/>PlatesbyCere · Vallejo, CA</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export const Route = createFileRoute("/api/send-receipt")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) return Response.json({ ok: false, error: "missing_api_key" }, { status: 500 });

        let body: unknown;
        try { body = await request.json(); } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }
        const parsed = OrderSchema.safeParse(body);
        if (!parsed.success) return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
        const order = parsed.data;

        const subject = `✨ Your PlatesbyCere Pre-Order — $${order.remaining.toFixed(2)} remaining 💖`;
        const ownerSubject = `🎀 New PlatesbyCere pre-order from ${order.name}`;
        const from = "PlatesbyCere <onboarding@resend.dev>";

        const sendOne = (to: string, subj: string, html: string, reply_to?: string) =>
          fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ from, to: [to], subject: subj, html, reply_to }),
          });

        const customerRes = await sendOne(order.email, subject, buildEmail(order, false), OWNER_EMAIL);
        const ownerRes = await sendOne(OWNER_EMAIL, ownerSubject, buildEmail(order, true), order.email);

        if (!customerRes.ok || !ownerRes.ok) {
          const cText = await customerRes.text().catch(() => "");
          const oText = await ownerRes.text().catch(() => "");
          console.error("resend error", { customer: cText, owner: oText });
          return Response.json({ ok: false, error: "send_failed", detail: { customer: cText, owner: oText } }, { status: 502 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
