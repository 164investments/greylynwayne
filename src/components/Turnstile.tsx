"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * Cloudflare Turnstile widget — invisible/low-friction CAPTCHA on the lead
 * forms. Renders into a div, hands the parent a token via `onVerify`, and the
 * server (`/api/lead`) verifies that token with Cloudflare before sending the
 * email. The site key is public (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`); the secret
 * lives only on the server.
 *
 * If the site key isn't configured the component renders nothing and the form
 * works exactly as before (the server skips verification too) — so the feature
 * degrades gracefully and never blocks a real lead on misconfig.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      "timeout-callback"?: () => void;
      appearance?: "always" | "execute" | "interaction-only";
      theme?: "auto" | "light" | "dark";
    },
  ) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

/** Whether Turnstile is configured (lets parents gate submit on a token). */
export const turnstileEnabled = Boolean(SITE_KEY);

const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile(
  { onVerify, onExpire },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep callbacks in refs so the render effect can run exactly once on mount.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
      }
    },
  }));

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | undefined;

    function render() {
      if (
        cancelled ||
        widgetId.current ||
        !containerRef.current ||
        !window.turnstile
      ) {
        return;
      }
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY!,
        callback: (token) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onExpireRef.current?.(),
        "timeout-callback": () => onExpireRef.current?.(),
        appearance: "interaction-only", // invisible unless a challenge is needed
        theme: "light",
      });
    }

    if (window.turnstile) {
      render();
    } else {
      if (!document.querySelector(`script[src^="${SCRIPT_SRC}"]`)) {
        const s = document.createElement("script");
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      poll = setInterval(() => {
        if (window.turnstile) {
          if (poll) clearInterval(poll);
          render();
        }
      }, 150);
    }

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="mt-2" />;
});

export default Turnstile;
