import Link from "next/link";
import { Fragment } from "react";

// --- markdown-lite: **bold** and [label](/path) -> React nodes ---
const LINK = "text-teal underline underline-offset-2 hover:text-teal-dark";

export function renderInline(text: string, keyPrefix: string, linkClass = LINK) {
  // Split on links first, then bold within each segment.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last)
      nodes.push(
        <Fragment key={`${keyPrefix}-t${i}`}>{renderBold(text.slice(last, m.index), `${keyPrefix}-b${i}`)}</Fragment>,
      );
    const href = m[2];
    const internal = href.startsWith("/");
    nodes.push(
      internal ? (
        <Link key={`${keyPrefix}-l${i}`} href={href} className={linkClass}>
          {m[1]}
        </Link>
      ) : (
        <a key={`${keyPrefix}-l${i}`} href={href} className={linkClass} rel="noopener">
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length)
    nodes.push(<Fragment key={`${keyPrefix}-t${i}`}>{renderBold(text.slice(last), `${keyPrefix}-b${i}`)}</Fragment>);
  return nodes;
}

function renderBold(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${idx}`} className="font-semibold text-charcoal">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={`${keyPrefix}-${idx}`}>{part}</Fragment>
    ),
  );
}

/** Plain text for JSON-LD: drops [label](/path) link syntax and **bold** markers. */
export const stripInline = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
