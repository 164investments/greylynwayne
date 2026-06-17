import { createHash } from "crypto";

/**
 * Server-side Meta Conversions API (CAPI) for lead events.
 *
 * Fires from /api/lead alongside the browser pixel, sharing the eventID the
 * client generated so Meta dedups the browser/server pair. Server-side carries
 * hashed email/phone/name (advanced matching) + _fbp/_fbc + IP/UA, which is the
 * highest-EMQ signal — it survives ad blockers and fast navigations that drop
 * the browser fire.
 *
 * Env (set in Vercel, read with .trim() against the trailing-newline bug):
 *   META_PIXEL_ID    — 1596777147987027
 *   META_CAPI_TOKEN  — long-lived system-user token (never expires)
 */

const META_API_VERSION = "v21.0";

const PIXEL_ID = process.env.META_PIXEL_ID?.trim();
const CAPI_TOKEN = process.env.META_CAPI_TOKEN?.trim();

function sha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

/** Phone must be digits-only (with country code) before hashing. */
function hashPhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/[^\d]/g, "");
  if (!digits) return undefined;
  // Default to US country code if a bare 10-digit number was entered.
  if (digits.length === 10) digits = "1" + digits;
  return createHash("sha256").update(digits).digest("hex");
}

export interface CapiLeadInput {
  eventId: string;
  source: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
  eventSourceUrl?: string;
}

/**
 * Send a Lead event to Meta CAPI. Returns true on success; never throws so the
 * caller (lead route) can fire-and-forget without risking the email send.
 */
export async function sendMetaLeadCapi(input: CapiLeadInput): Promise<boolean> {
  if (!PIXEL_ID || !CAPI_TOKEN) return false;

  const userData: Record<string, unknown> = {};
  const em = sha256(input.email);
  const ph = hashPhone(input.phone);
  const fn = sha256(input.firstName);
  const ln = sha256(input.lastName);
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (fn) userData.fn = [fn];
  if (ln) userData.ln = [ln];
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: userData,
        custom_data: { lead_source: input.source },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
        CAPI_TOKEN,
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      const detail = await res.text();
      console.error(`[capi] Meta Lead error ${res.status}: ${detail.slice(0, 500)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[capi] Meta Lead send failed:", err);
    return false;
  }
}
