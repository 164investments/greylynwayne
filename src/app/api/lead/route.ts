import { NextResponse } from "next/server";
import { sendMetaLeadCapi } from "@/lib/server-tracking";
import { checkRateLimit } from "@/lib/rate-limit";

/** Max well-formed lead submissions allowed per client IP per window. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Lead-capture endpoint for the Contact form, Furniture Request form, and chat
 * widget. Emails a formatted notification to the Greylyn Wayne inbox via Resend
 * (reply-to = customer) AND fires a server-side Meta CAPI Lead event sharing the
 * browser's eventID so Meta dedups the pair (the resilient half of tracking —
 * survives ad blockers / fast SMS hand-offs that drop the browser fbq fire).
 *
 * Env (set in Vercel):
 *   RESEND_API_KEY   — Resend API key for the account that owns the sender domain
 *   LEAD_FROM_EMAIL  — verified Resend sender, e.g. "Greylyn Wayne Website <leads@greylynwayne.com>"
 *   LEAD_TO_EMAIL    — recipient (defaults to design@greylynwayne.com)
 *   META_PIXEL_ID    — 1596777147987027 (CAPI)
 *   META_CAPI_TOKEN  — long-lived system-user token (CAPI)
 *
 * The form components POST JSON here and render success/error from the response.
 */

/** Tracking context the browser passes so server CAPI shares its dedup eventID. */
type LeadTrackingContext = {
  eventId?: string;
  fbp?: string;
  fbc?: string;
  gclid?: string;
  pagePath?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO = "design@greylynwayne.com";

const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
  // Cloudflare Turnstile token (set on the two web forms; absent on chat).
  turnstileToken?: string;
  // Browser tracking context (eventID for CAPI dedup, click IDs).
  tracking?: LeadTrackingContext;
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
    <div style="font-family:Arial,Helvetica,sans-serif;color:#3e4242;max-width:560px;">
      <h2 style="color:#3e4242;margin:0 0 4px;">${esc(
        isChat
          ? "New Text-Chat Lead"
          : isFurniture
            ? "New Furniture Inquiry"
            : "New Consultation Request",
      )}</h2>
      <p style="color:#6e9294;margin:0 0 20px;font-size:13px;">via greylynwayne.com</p>
      <table style="border-collapse:collapse;width:100%;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;background:#e0e3e3;font-weight:bold;width:120px;vertical-align:top;">${esc(
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

/** Best-effort client IP (Vercel always sets x-forwarded-for; fall back gracefully). */
function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Verify a Cloudflare Turnstile token. Returns true to ALLOW the submission:
 * - If no secret is configured, verification is skipped (fail-open) so a
 *   missing env var never silently blocks every real lead.
 * - Otherwise the token must be present and validated by Cloudflare. Network
 *   errors fail-open (don't lose a real lead to a Cloudflare hiccup); only an
 *   explicit invalid verdict blocks.
 */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true; // not configured → skip
  if (!token) return false; // configured but no token → bot / stale page

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error(`[lead] Turnstile verify HTTP ${res.status}`);
      return true; // Cloudflare unreachable → fail open
    }
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[lead] Turnstile verify failed:", err);
    return true; // network error → fail open
  }
}

/**
 * Conservative spam-content heuristic for the message body. Catches the classic
 * human-typed contact-form spam (SEO/backlink/crypto pitches stuffed with links)
 * that the honeypot and rate limiter don't — without risking real leads: the
 * thresholds are well above anything a genuine client (even a realtor pasting a
 * listing link or two) would send.
 */
function isSpammyContent(body: string): boolean {
  if (!body) return false;
  const linkCount = (body.match(/https?:\/\/|\bwww\./gi) || []).length;
  if (linkCount >= 5) return true;
  if (/\[\/?url\b/i.test(body)) return true; // BBCode link tags — always spam here
  return false;
}

/** Read a cookie value from the raw Cookie header (CAPI fallback for _fbp/_fbc). */
function cookieFromRequest(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  const m = header.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Fire the server-side Meta CAPI Lead from a completed lead submission. */
async function fireCapiLead(data: LeadPayload, request: Request): Promise<void> {
  const t = data.tracking;
  if (!t?.eventId) return; // No browser eventID → can't dedup; skip server fire.

  // Resolve first/last name (chat sends a single `name`).
  let firstName = data.firstName;
  let lastName = data.lastName;
  if (!firstName && data.name) {
    const parts = data.name.trim().split(/\s+/);
    firstName = parts[0];
    lastName = parts.slice(1).join(" ") || undefined;
  }

  const ip = getClientIp(request);
  const clientIp = ip === "unknown" ? undefined : ip;
  const safePagePath = t.pagePath?.startsWith("/") ? t.pagePath : "/";

  await sendMetaLeadCapi({
    eventId: t.eventId,
    source: data.formType || "contact",
    email: data.email,
    phone: data.phone,
    firstName,
    lastName,
    fbp: t.fbp || cookieFromRequest(request, "_fbp"),
    fbc: t.fbc || cookieFromRequest(request, "_fbc"),
    clientIp,
    userAgent: request.headers.get("user-agent") || undefined,
    eventSourceUrl: `https://www.greylynwayne.com${safePagePath}`,
  });
}

/**
 * Durable first-party record of the lead in Supabase (greylynwayne-admin
 * project, `website_leads` table). Best-effort and fully decoupled from the
 * email path: a DB failure never blocks the Resend send, and vice versa. Runs
 * server-side with the service-role key (table is RLS-locked to service-role).
 */
async function persistLead(
  data: LeadPayload,
  request: Request,
  clientIp: string,
): Promise<void> {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return; // not configured — skip silently; email still sends

  const t = data.tracking || {};
  const fullName =
    data.name || [data.firstName, data.lastName].filter(Boolean).join(" ") || null;
  const row = {
    source: data.formType || "contact",
    name: fullName,
    email: data.email || null,
    phone: data.phone || null,
    service: data.service || data.interest || null,
    message: data.message || data.details || null,
    page_path: t.pagePath || null,
    gclid: t.gclid || null,
    event_id: t.eventId || null,
    fbp: t.fbp || null,
    fbc: t.fbc || null,
    user_agent: request.headers.get("user-agent"),
    ip: clientIp,
    raw: { ...data, company: undefined, turnstileToken: undefined },
  };

  try {
    const res = await fetch(`${url}/rest/v1/website_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error(`[lead] DB persist failed ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("[lead] DB persist error:", err);
  }
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

  // Link-stuffed / BBCode spam bodies: same silent-accept treatment as the
  // honeypot — the sender thinks it worked, no email is sent.
  if (isSpammyContent(data.message || data.details || "")) {
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

  const clientIp = getClientIp(request);

  // Rate limit only well-formed, non-honeypot, non-spam attempts (the ones that
  // would actually send an email) so a flood can't bury real leads or exhaust
  // the Resend quota. Keyed per client IP.
  const rate = checkRateLimit(clientIp, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "You've sent several messages in a short time. Please wait a few minutes, or call us at (971) 930-0220.",
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  // Cloudflare Turnstile — the real bot wall on the two web forms. Chat has no
  // widget (it's phone-first + fails open to SMS), so it's exempt; the honeypot
  // and rate limit still cover it.
  if (data.formType !== "chat") {
    const human = await verifyTurnstile(data.turnstileToken, clientIp);
    if (!human) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't verify your submission. Please refresh the page and try again, or call us at (971) 930-0220.",
        },
        { status: 403 },
      );
    }
  }

  // Durable lead record first — so a lead is captured even if the email send
  // later fails. Decoupled: never throws, never blocks the email path.
  await persistLead(data, request, clientIp);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_FROM_EMAIL?.trim();
  const to = process.env.LEAD_TO_EMAIL?.trim() || DEFAULT_TO;

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

    // Server-side Meta CAPI Lead — shares the browser eventID for dedup. Best
    // effort: never blocks or fails the lead (sendMetaLeadCapi swallows errors).
    await fireCapiLead(data, request);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Send failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please call us at (971) 930-0220." },
      { status: 502 },
    );
  }
}
