import { NextResponse } from "next/server";

/**
 * Lead-capture endpoint for both the Contact form and the Furniture Request
 * form. Emails a formatted notification to the Greylyn Wayne inbox via Resend,
 * with reply-to set to the customer so Jody can reply directly from her inbox.
 *
 * Env (set in Vercel):
 *   RESEND_API_KEY   — Resend API key for the account that owns the sender domain
 *   LEAD_FROM_EMAIL  — verified Resend sender, e.g. "Greylyn Wayne Website <leads@greylynwayne.com>"
 *   LEAD_TO_EMAIL    — recipient (defaults to design@greylynwayne.com)
 *
 * The form components POST JSON here and render success/error from the response.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO = "design@greylynwayne.com";

type LeadPayload = {
  formType?: "contact" | "furniture_request" | "chat";
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  interest?: string;
  message?: string;
  details?: string;
  // Honeypot — real users never fill this; bots do.
  company?: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmail(data: LeadPayload): {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
} {
  const isFurniture = data.formType === "furniture_request";
  const isChat = data.formType === "chat";
  const fullName =
    data.name ||
    [data.firstName, data.lastName].filter(Boolean).join(" ") ||
    "(no name provided)";
  const email = data.email || "";
  const phone = data.phone || "—";
  const category = isFurniture
    ? data.interest || "(not specified)"
    : data.service || "(not specified)";
  const body =
    (isFurniture ? data.details : data.message) ||
    (isChat ? "(started a text conversation)" : "(no message)");

  // Chat leads are phone-first (the visitor is being handed off to SMS), so
  // surface the phone and skip the service/email rows that don't apply.
  const rows: [string, string][] = isChat
    ? [
        ["Name", fullName],
        ["Phone", phone],
        ["Email", email || "—"],
      ]
    : [
        ["Name", fullName],
        ["Email", email || "—"],
        ["Phone", phone],
        [isFurniture ? "Interest" : "Service", category],
      ];

  const subject = isChat
    ? `New text-chat lead — ${fullName} (${phone})`
    : isFurniture
      ? `Furniture inquiry — ${fullName}`
      : `New consultation request — ${fullName}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#2a2a2a;max-width:560px;">
      <h2 style="color:#4a6e6f;margin:0 0 4px;">${esc(
        isChat
          ? "New Text-Chat Lead"
          : isFurniture
            ? "New Furniture Inquiry"
            : "New Consultation Request",
      )}</h2>
      <p style="color:#6b8f90;margin:0 0 20px;font-size:13px;">via greylynwayne.com</p>
      <table style="border-collapse:collapse;width:100%;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;background:#f0ebe4;font-weight:bold;width:120px;vertical-align:top;">${esc(
              label,
            )}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(
              value,
            )}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 4px;font-weight:bold;">${esc(
        isChat
          ? "Message:"
          : isFurniture
            ? "What they're looking for:"
            : "Project details:",
      )}</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.5;">${esc(body)}</p>
    </div>`;

  const text = `${subject}\n\n${rows
    .map(([l, v]) => `${l}: ${v}`)
    .join("\n")}\n\n${isFurniture ? "Looking for" : "Details"}:\n${body}`;

  return {
    subject,
    html,
    text,
    replyTo: email && isValidEmail(email) ? email : undefined,
  };
}

export async function POST(request: Request) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept (200) so bots think they succeeded, but don't send.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Minimal server-side validation (forms also validate client-side).
  const hasName = Boolean(data.name || data.firstName);
  if (data.formType === "chat") {
    // Phone-first lead being handed off to SMS — name + phone required.
    if (!hasName || !data.phone) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name and phone number." },
        { status: 400 },
      );
    }
  } else {
    const bodyText = data.message || data.details;
    if (!hasName || !data.email || !isValidEmail(data.email) || !bodyText) {
      return NextResponse.json(
        { ok: false, error: "Please complete the required fields." },
        { status: 400 },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL || DEFAULT_TO;

  if (!apiKey || !from) {
    // Misconfiguration — log for ops, return a friendly error so the form can
    // show its error state rather than silently dropping a real lead.
    console.error("[lead] Missing RESEND_API_KEY or LEAD_FROM_EMAIL env var");
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please call us at (971) 930-0220." },
      { status: 500 },
    );
  }

  const { subject, html, text, replyTo } = buildEmail(data);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[lead] Resend error ${res.status}: ${detail}`);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please call us at (971) 930-0220." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Send failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please call us at (971) 930-0220." },
      { status: 502 },
    );
  }
}
