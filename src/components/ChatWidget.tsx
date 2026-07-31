"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  trackEvent,
  buildLeadTracking,
  fireLeadConversions,
} from "@/lib/tracking";

/**
 * Capture-then-text lead widget. Optimizes for speed-to-lead on a local service
 * business: it grabs name + phone (firing the lead into the /api/lead email
 * pipeline immediately, so the lead is owned even if the visitor never sends the
 * text), then hands off to the visitor's SMS app pre-addressed to the business
 * line for the fastest possible reply. Desktop (no SMS handler) still captures
 * the lead and shows a confirmation.
 *
 * Ported from the WNF widget (2026-07-05): a named human HOST (Tori, GW's
 * interior designer, with headshot) for the "liking" lever, and a two-stage
 * PAGE-AWARE proactive nudge —
 *   • stage 1 "mini": a lean open invitation. On desktop it sits to the LEFT of
 *     the launch pill (like WNF); on mobile it floats above the sticky CTA bar.
 *     Its one job is to earn the first tap (open invite, never a transactional
 *     ask — see memory feedback_proactive-chat-nudge-copy).
 *   • stage 2 "card": if the visitor lingers, the mini escalates to a richer,
 *     GW-branded card above the pill — page-aware headline + a true proof line +
 *     Text-Us CTA.
 * Copy + timing vary by page. Still 100% SMS handoff (no AI chat).
 */

const BUSINESS_SMS = "+19719300220";

const HOST = {
  name: "Tori",
  role: "Greylyn Wayne · Interior Design",
  img: "/images/team/tori-avatar.webp",
};

type Copy = {
  whisper: string; // stage-1 mini: open invitation
  headline: string; // stage-2 card: page-aware hook (EB Garamond)
  sub: string; // stage-2 card: supporting proof/soft line
  welcome: string; // panel intro
  placeholder: string; // message input
};

// TRUE proof bank only: 4x Street of Dreams, 4.9★ from 163 clients, since 2015.
const COPY: Record<string, Copy> = {
  home: {
    whisper: "Hi, I'm Tori 👋 Thinking about staging or a design project? Ask me anything.",
    headline: "Staging to sell, or design to stay?",
    sub: "We do both — 4x Street of Dreams designer, 4.9★ from 163 clients. Text me and I'll reply personally.",
    welcome: "Hi, I'm Tori with Greylyn Wayne. Tell me a bit about your project and I'll text you right back.",
    placeholder: "How can we help? (optional)",
  },
  staging: {
    whisper: "Hi, I'm Tori 👋 Questions about staging your home? I'm here to help.",
    headline: "Staging that helps your home sell faster.",
    sub: "4x Street of Dreams designer, 4.9★ from 163 clients. Tell me about your listing and I'll text you back.",
    welcome: "Hi, I'm Tori. Staging a home to sell? Send a few details and I'll text you back with next steps.",
    placeholder: "What are you looking to stage?",
  },
  design: {
    whisper: "Hi, I'm Tori 👋 Dreaming up a space? Tell me what you're working on.",
    headline: "Let's design a space you'll love coming home to.",
    sub: "Full-service interior design, from one room to a whole home. Text me about your project and I'll reply personally.",
    welcome: "Hi, I'm Tori, our interior designer. Tell me about the space you have in mind and I'll text you right back.",
    placeholder: "Tell me about your space…",
  },
  portfolio: {
    whisper: "Hi, I'm Tori 👋 See something you love? I can tell you more.",
    headline: "Love what you're seeing?",
    sub: "That could be your home next. Text me and let's talk about your space.",
    welcome: "Hi, I'm Tori. Ask me anything about the work you're seeing and I'll text you right back.",
    placeholder: "What caught your eye?",
  },
  reviews: {
    whisper: "Hi, I'm Tori 👋 Have a question about working with us? Just ask.",
    headline: "See why clients rate us 4.9★.",
    sub: "Have a question about working with us? Text me — I'll reply personally.",
    welcome: "Hi, I'm Tori with Greylyn Wayne. Happy to answer any questions — I'll text you right back.",
    placeholder: "How can we help? (optional)",
  },
  about: {
    whisper: "Hi, I'm Tori 👋 Curious how we work? I'm happy to chat.",
    headline: "Let's talk about your project.",
    sub: "4x Street of Dreams designer, 4.9★ from 163 clients. I'm happy to help — text me anytime.",
    welcome: "Hi, I'm Tori with Greylyn Wayne. Tell me what you're thinking about and I'll text you right back.",
    placeholder: "How can we help? (optional)",
  },
  // Builder / developer intent (lever: authority + their outcome, not homeowner's).
  "new-construction": {
    whisper: "Hi, I'm Tori 👋 Staging model homes or new builds? Let's talk.",
    headline: "Model homes that help your builds sell.",
    sub: "We stage new construction for Portland builders — buyers picture the life, not the empty rooms. 4x Street of Dreams designer. Text me about your project.",
    welcome: "Hi, I'm Tori. Staging model homes or a new development? Tell me about the project and I'll text you right back.",
    placeholder: "Tell me about your build…",
  },
  // Short-term-rental owner intent (lever: their ROI / bookings, not a home sale).
  str: {
    whisper: "Hi, I'm Tori 👋 Furnishing a short-term rental? I can help.",
    headline: "Design that earns more bookings.",
    sub: "Airbnb & vacation-rental interiors built to photograph beautifully and delight guests. Text me about your property and I'll reply personally.",
    welcome: "Hi, I'm Tori. Designing a short-term rental? Tell me about your property and I'll text you right back.",
    placeholder: "Tell me about your rental…",
  },
  // Service-areas hub (lever: unity / metro-wide locality).
  hub: {
    whisper: "Hi, I'm Tori 👋 Looking for staging or design in your area? Ask me.",
    headline: "Staging & design across the Portland metro.",
    sub: "From Lake Oswego to Vancouver — 4x Street of Dreams designer, 4.9★ from 163 clients. Text me about your project.",
    welcome: "Hi, I'm Tori. Wherever you are in the metro, we can help — tell me about your project and I'll text you right back.",
    placeholder: "Where are you located?",
  },
  // Cost/pricing blog posts = real commercial intent → offer a real number.
  "blog-cost": {
    whisper: "Hi, I'm Tori 👋 Want a real number for your project? Just ask.",
    headline: "Want a real number for your project?",
    sub: "Every project is priced to the home — text me a few details and I'll come back with a real range, no pressure.",
    welcome: "Hi, I'm Tori. Want a real quote for your project? Send a few details and I'll text you back with a range.",
    placeholder: "What are you planning?",
  },
  // Informational blog posts = top-of-funnel → soft, liking-led (NO_CARD: mini only, no hard escalation).
  blog: {
    whisper: "Hi, I'm Tori 👋 Question while you read? I'm here.",
    headline: "Question about your own space?",
    sub: "Happy to help you think it through — text me and I'll reply personally.",
    welcome: "Hi, I'm Tori with Greylyn Wayne. Question about your own space? Text me and I'll reply personally.",
    placeholder: "How can we help? (optional)",
  },
  default: {
    whisper: "Hi, I'm Tori 👋 Have a question? I'm here to help.",
    headline: "Have a project in mind?",
    sub: "Staging or interior design — text me and I'll reply personally.",
    welcome: "Hi, I'm Tori with Greylyn Wayne. Send a quick note about your project and I'll text you right back.",
    placeholder: "How can we help? (optional)",
  },
};

// Stage-1 (mini) delay per page (ms). Higher-intent pages invite sooner.
const TIMING: Record<string, number> = {
  staging: 9000,
  design: 9000,
  city: 10000,
  "new-construction": 10000,
  str: 10000,
  "blog-cost": 11000,
  hub: 12000,
  home: 14000,
  portfolio: 14000,
  reviews: 16000,
  about: 18000,
  blog: 20000,
  default: 18000,
};
// Stage-2 (card) escalation delay after the mini shows, if still un-engaged.
const CARD_DELAY = 8000;
// Top-of-funnel pages: keep the soft mini, never escalate to the harder card
// (hard-selling an informational reader is a message-match miss — CRO order-of-ops).
const NO_CARD = new Set(["blog"]);

const NO_WHISPER = new Set(["/contact", "/furniture-request", "/careers", "/privacy-policy"]);

const WHISPER_STORAGE = "gw_chat_whisper_dismissed";
const WHISPER_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // don't re-nag for 7 days after dismiss

// Stage-1 reveal also fires on scroll depth (engaged reader) — time OR scroll,
// whichever comes first (WNF's TIMING.s). Higher-intent pages trigger shallower.
const SCROLL_TRIGGER: Record<string, number> = {
  staging: 0.3,
  design: 0.3,
  "new-construction": 0.3,
  str: 0.3,
  city: 0.35,
  "blog-cost": 0.4,
  portfolio: 0.4,
  hub: 0.4,
  home: 0.45,
  reviews: 0.5,
  about: 0.5,
  blog: 0.55,
  default: 0.5,
};
// Desktop exit-intent (cursor leaves top of viewport) → last-chance reveal, on
// high-intent pages only. No-op on touch (coarse pointer).
const EXIT_INTENT = new Set(["staging", "design", "city", "new-construction", "str"]);
// The rich card shows at most ONCE per browsing session (sessionStorage), like
// WNF's wnf_pop_done — the mini can still show per page, but the harder card
// won't re-nag on every navigation.
const CARD_SESSION_KEY = "gw_chat_card_shown";
// Per-session page journey (path + title), attached to the lead for team context.
const JOURNEY_KEY = "gw_chat_journey";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function resolveCopy(pathname: string): { key: string; copy: Copy } {
  if (pathname === "/") return { key: "home", copy: COPY.home };
  if (pathname.startsWith("/home-staging")) return { key: "staging", copy: COPY.staging };
  if (pathname.startsWith("/interior-design")) return { key: "design", copy: COPY.design };
  if (pathname.startsWith("/new-construction-staging"))
    return { key: "new-construction", copy: COPY["new-construction"] };
  if (pathname.startsWith("/short-term-rental-design")) return { key: "str", copy: COPY.str };
  if (pathname.startsWith("/service-areas/")) {
    const slug = pathname.split("/")[2] || "";
    const city = slug ? titleCase(slug) : null;
    if (city) {
      return {
        key: "city",
        copy: {
          whisper: `Hi, I'm Tori 👋 We stage & design all over ${city} — happy to help.`,
          headline: `Staging & interior design across ${city}.`,
          sub: `We work all over ${city} — 4x Street of Dreams designer, 4.9★ from 163 clients. Text me and I'll reply personally.`,
          welcome: `Hi, I'm Tori. We stage and design throughout ${city} — tell me about your project and I'll text you right back.`,
          placeholder: `How can we help in ${city}?`,
        },
      };
    }
  }
  if (pathname === "/service-areas") return { key: "hub", copy: COPY.hub };
  if (pathname.startsWith("/blog")) {
    // Cost/pricing posts carry real commercial intent; other posts are top-of-funnel.
    const isCost = pathname.includes("cost");
    return isCost ? { key: "blog-cost", copy: COPY["blog-cost"] } : { key: "blog", copy: COPY.blog };
  }
  if (
    pathname.startsWith("/portfolio") ||
    pathname.startsWith("/before-and-after") ||
    pathname.startsWith("/street-of-dreams") ||
    pathname.startsWith("/alla-famiglia") ||
    pathname.startsWith("/staged-homes")
  )
    return { key: "portfolio", copy: COPY.portfolio };
  if (pathname.startsWith("/reviews")) return { key: "reviews", copy: COPY.reviews };
  if (pathname.startsWith("/about") || pathname.startsWith("/meet-jody"))
    return { key: "about", copy: COPY.about };
  return { key: "default", copy: COPY.default };
}

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <span className="relative inline-block flex-shrink-0" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HOST.img}
        alt={HOST.name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="rounded-full object-cover w-full h-full"
      />
      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
    </span>
  );
}

type Nudge = "none" | "mini" | "card";

export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const { key, copy } = resolveCopy(pathname);

  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [nudge, setNudge] = useState<Nudge>("none");
  const [liftPx, setLiftPx] = useState<number | null>(null); // dynamic offset above sticky bars (mobile)
  const [kbInset, setKbInset] = useState(0); // keyboard height to lift the panel above (mobile)

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false); // one-shot per page for the time/scroll/exit reveal

  function clearNudge() {
    setNudge("none");
  }

  function toggle() {
    setOpen((v) => {
      const next = !v;
      if (next) trackEvent("chat_open");
      return next;
    });
    clearNudge();
  }

  // Let any "Text Us" CTA elsewhere on the page open this widget (so those
  // CTAs capture the lead instead of leaking to a raw sms: link). SiteTracker
  // dispatches `gw:open-chat` when a [data-open-chat] element is clicked.
  useEffect(() => {
    function openFromCta() {
      setDone(false);
      setOpen(true);
      setNudge("none");
      trackEvent("chat_open", { source: "cta" });
    }
    window.addEventListener("gw:open-chat", openFromCta);
    return () => window.removeEventListener("gw:open-chat", openFromCta);
  }, []);

  // Stage 1: reveal the mini on TIME or SCROLL-DEPTH or (desktop) EXIT-INTENT —
  // whichever fires first (WNF's fire() model). Re-armed per page, suppressed on
  // utility pages / during the dismiss cooldown / when already open. No event on
  // auto-show (avoids GA4 engagement inflation) — only deliberate click/dismiss.
  useEffect(() => {
    revealedRef.current = false;
    if (open || done || NO_WHISPER.has(pathname)) return;
    let dismissedAt = 0;
    try {
      dismissedAt = Number(window.localStorage.getItem(WHISPER_STORAGE) || 0);
    } catch {
      /* storage blocked — treat as never dismissed */
    }
    if (dismissedAt && Date.now() - dismissedAt < WHISPER_COOLDOWN_MS) return;

    const frac = SCROLL_TRIGGER[key] ?? SCROLL_TRIGGER.default;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const useExit = !coarse && EXIT_INTENT.has(key);

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      cleanup();
      setNudge("mini");
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= frac) reveal();
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) reveal();
    };
    const t = window.setTimeout(reveal, TIMING[key] ?? TIMING.default);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (useExit) document.addEventListener("mouseout", onExit);
    function cleanup() {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      if (useExit) document.removeEventListener("mouseout", onExit);
    }
    return cleanup;
  }, [pathname, key, open, done]);

  // Stage 2: escalate the mini to the richer card after a dwell — but at most
  // ONCE PER SESSION (sessionStorage), and never on top-of-funnel pages (NO_CARD).
  useEffect(() => {
    if (nudge !== "mini" || open || done || NO_CARD.has(key)) return;
    let alreadyShown = false;
    try {
      alreadyShown = !!window.sessionStorage.getItem(CARD_SESSION_KEY);
    } catch {
      /* ignore */
    }
    if (alreadyShown) return;
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(CARD_SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setNudge("card");
    }, CARD_DELAY);
    return () => window.clearTimeout(t);
  }, [nudge, open, done, key]);

  // Record the per-session page journey (path + title), attached to leads for context.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(JOURNEY_KEY);
      const arr: { path: string; title: string }[] = raw ? JSON.parse(raw) : [];
      if (!arr.length || arr[arr.length - 1].path !== pathname) {
        arr.push({ path: pathname, title: document.title });
        window.sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(arr.slice(-20)));
      }
    } catch {
      /* storage blocked — journey is best-effort */
    }
  }, [pathname]);

  // Lift the widget above whatever sticky bottom bar is actually on screen
  // (GW's [data-mobile-cta], a cookie/promo bar, etc.) instead of a fixed guess.
  useEffect(() => {
    const sync = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setLiftPx(null); // desktop → let the Tailwind class position it
        return;
      }
      let lift = 24; // base bottom on mobile when nothing is pinned there
      const bar = document.querySelector("[data-mobile-cta]") as HTMLElement | null;
      if (bar) {
        const r = bar.getBoundingClientRect();
        const cs = window.getComputedStyle(bar);
        const visible =
          cs.display !== "none" &&
          cs.visibility !== "hidden" &&
          cs.opacity !== "0" &&
          r.height > 0 &&
          r.bottom > window.innerHeight - 90;
        if (visible) lift = Math.round(r.height) + 12;
      }
      setLiftPx(lift);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    const id = window.setInterval(sync, 1200); // backstop for bars that appear without a scroll
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.clearInterval(id);
    };
  }, []);

  // Keyboard-safe: while the capture form is open on mobile, lift it above the
  // on-screen keyboard so the phone field never hides behind it (visualViewport).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!open || !vv) {
      setKbInset(0);
      return;
    }
    const onVV = () => {
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKbInset(inset > 120 ? inset : 0); // ignore small URL-bar changes; only react to a real keyboard
    };
    onVV();
    vv.addEventListener("resize", onVV);
    vv.addEventListener("scroll", onVV);
    return () => {
      vv.removeEventListener("resize", onVV);
      vv.removeEventListener("scroll", onVV);
    };
  }, [open]);

  // Mobile back-button / gesture closes the panel instead of leaving the page.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    window.history.pushState({ gwChat: 1 }, "");
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      const st = window.history.state as { gwChat?: number } | null;
      if (st && st.gwChat) window.history.back(); // closed via UI → drop the pushed entry
    };
  }, [open]);

  // Focus management: on open, focus the first field (desktop only — avoid a
  // surprise keyboard on mobile); trap Tab within the panel; Escape closes;
  // restore focus to the launcher on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const ft = window.setTimeout(() => {
      if (!isDesktop) return;
      const first = panel.querySelector<HTMLElement>('input[name="name"]') || focusables()[0];
      try {
        first?.focus({ preventScroll: true });
      } catch {
        first?.focus();
      }
    }, 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    panel.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(ft);
      panel.removeEventListener("keydown", onKey);
      const target = launcherRef.current || prevActive;
      try {
        target?.focus({ preventScroll: true });
      } catch {
        target?.focus();
      }
    };
  }, [open]);

  function dismissNudge(stage: Nudge) {
    setNudge("none");
    try {
      window.localStorage.setItem(WHISPER_STORAGE, String(Date.now()));
    } catch {
      /* ignore */
    }
    trackEvent("chat_nudge_dismiss", { page: key, stage });
  }

  function openFromNudge(stage: Nudge) {
    setDone(false);
    setOpen(true);
    setNudge("none");
    trackEvent("chat_open", { source: "nudge" });
    trackEvent("chat_nudge_click", { page: key, stage });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value?.trim() || "";
    const name = get("name");
    const phoneVal = get("phone");
    const message = get("message");
    const company = get("company");

    if (!name || !phoneVal) {
      setError("Please enter your name and phone number.");
      return;
    }
    if (company) {
      setDone(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Build tracking BEFORE the POST so server CAPI + browser fbq share one
    // eventID. Fire the conversions BEFORE the SMS hand-off (beacon transport in
    // fireAdsConversion survives the window.location navigation below).
    const tracking = buildLeadTracking({ phone: phoneVal, firstName: name });

    // Session journey (pages seen) + current title → team context, lands in the
    // lead's `raw` jsonb without a route change.
    let journey: { path: string; title: string }[] = [];
    try {
      journey = JSON.parse(window.sessionStorage.getItem(JOURNEY_KEY) || "[]").slice(-12);
    } catch {
      /* best-effort */
    }

    // Capture first (safety net) — don't block the SMS handoff on its result.
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "chat",
          name,
          phone: phoneVal,
          message,
          company, // honeypot
          pageTitle: typeof document !== "undefined" ? document.title : "",
          journey,
          tracking, // carries pagePath (window.location.pathname) for attribution
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error("Lead capture failed");
      fireLeadConversions("chat", tracking);
    } catch {
      // Lead capture failed; still hand off to text so the visitor isn't blocked.
    }

    // Hand off to the visitor's SMS app, pre-filled.
    const body = `Hi Greylyn Wayne, this is ${name}.${message ? ` ${message}` : " I'd like to talk about staging / interior design."}`;
    const smsHref = `sms:${BUSINESS_SMS}?&body=${encodeURIComponent(body)}`;
    setPhone(phoneVal);
    setLoading(false);
    setDone(true);
    trackEvent("chat_text_handoff");
    await new Promise((resolve) => setTimeout(resolve, 200));
    window.location.href = smsHref;
  }

  const showMini = nudge === "mini" && !open && !done;
  const showCard = nudge === "card" && !open && !done;

  const miniInner = (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.16)]">
      <button
        onClick={() => dismissNudge("mini")}
        aria-label="Dismiss"
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-gray-200 text-charcoal-light shadow-sm flex items-center justify-center hover:text-charcoal z-10"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        onClick={() => openFromNudge("mini")}
        className="flex items-start gap-3 text-left p-4 w-full hover:bg-warm/60 rounded-2xl transition-colors"
      >
        <Avatar size={44} />
        <span className="text-sm text-charcoal leading-snug">{copy.whisper}</span>
      </button>
    </div>
  );

  // E (lift over sticky bars) + C (keyboard) — inline overrides the Tailwind
  // fallback bottom only when we've measured a client-side offset.
  const containerStyle: CSSProperties = {};
  if (liftPx != null) containerStyle.bottom = liftPx;
  if (kbInset > 0) containerStyle.transform = `translateY(-${kbInset}px)`;

  return (
    <div
      className="fixed right-4 bottom-20 lg:right-6 lg:bottom-6 z-50 flex flex-col items-end"
      style={containerStyle}
    >
      {/* Stage 2 — richer GW-branded card, above the pill / sticky bar (both viewports) */}
      {showCard && (
        <div className="mb-3 w-[min(21rem,calc(100vw-2rem))] animate-[gwWhisperIn_.35s_ease-out]">
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-[0_12px_44px_rgba(0,0,0,0.20)] overflow-hidden">
            <button
              onClick={() => dismissNudge("card")}
              aria-label="Dismiss"
              className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full text-charcoal-light/70 hover:text-charcoal flex items-center justify-center z-10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar size={48} />
                <div>
                  <p className="font-[family-name:var(--font-playfair)] text-lg text-charcoal leading-none">
                    Hi, I&apos;m {HOST.name}
                  </p>
                  <p className="text-teal text-[11px] tracking-[0.12em] uppercase mt-1">{HOST.role}</p>
                </div>
              </div>
              <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal leading-snug mb-2">
                {copy.headline}
              </p>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">{copy.sub}</p>
              <button
                onClick={() => openFromNudge("card")}
                className="w-full bg-teal text-white py-3 text-sm tracking-wider uppercase font-medium hover:bg-teal-dark transition-colors flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Text Us
              </button>
              <p className="text-center text-[11px] text-charcoal-light mt-2.5">
                or call{" "}
                <a href="tel:9719300220" className="text-teal font-medium hover:text-teal-dark">
                  (971) 930-0220
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stage 1 mini — MOBILE: floats above the sticky CTA bar */}
      {showMini && (
        <div className="lg:hidden mb-3 w-[min(19rem,calc(100vw-2rem))] animate-[gwWhisperIn_.35s_ease-out]">
          {miniInner}
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Text Greylyn Wayne"
          className="mb-3 w-[min(20rem,calc(100vw-2rem))] bg-white border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
        >
          <div className="bg-teal text-white px-5 py-4 flex items-center gap-3">
            <Avatar size={40} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight">{HOST.name} · Greylyn Wayne</p>
              <p className="text-teal-bg text-xs">Usually replies in minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white flex-shrink-0"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {done ? (
            <div className="p-5 text-center">
              <svg className="h-10 w-10 text-teal mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-charcoal text-sm mb-2">
                Your text should be opening now. If it doesn&apos;t, we already have your
                number — we&apos;ll text you at <span className="font-medium">{phone}</span> shortly.
              </p>
              <p className="text-charcoal-light text-xs">
                Prefer to talk?{" "}
                <a href="tel:9719300220" className="text-teal font-medium hover:text-teal-dark">
                  Call (971) 930-0220
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <p className="text-charcoal-light text-xs leading-relaxed">{copy.welcome}</p>
              {/* Honeypot */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name *"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                placeholder="Mobile number *"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              <input
                type="text"
                name="message"
                placeholder={copy.placeholder}
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-white py-3 text-sm tracking-wider uppercase font-medium hover:bg-teal-dark transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Text Us Now"}
              </button>
              <p className="text-[11px] text-charcoal-light text-center">
                We&apos;ll only use your number to reply about your project.
              </p>
            </form>
          )}
        </div>
      )}

      {/* Launch pill (desktop). Wrapper is relative so the desktop mini can sit to its LEFT. */}
      <div className="relative">
        {/* Stage 1 mini — DESKTOP: to the LEFT of the pill, like WNF, with a right-pointing tail */}
        {showMini && (
          <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3 w-72 animate-[gwWhisperIn_.35s_ease-out]">
            {miniInner}
            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rotate-45 bg-white border-t border-r border-gray-200" />
          </div>
        )}

        <button
          ref={launcherRef}
          onClick={toggle}
          aria-label={open ? "Close chat" : "Text us"}
          aria-expanded={open}
          // Desktop-only floating handle. On mobile the sticky bottom bar is the
          // single persistent Text action — avoids two stacked "Text Us" controls.
          // The panel still opens on mobile via any [data-open-chat] CTA.
          className={`${open ? "flex" : "hidden lg:flex"} items-center gap-2 bg-teal text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-teal-dark transition-colors`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="text-sm font-medium tracking-wide">{open ? "Close" : "Text Us"}</span>
        </button>
      </div>
    </div>
  );
}
